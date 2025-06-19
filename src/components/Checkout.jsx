import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../store/user-progress";
import { cartActions } from "../store/cart";
import { sendOrderData } from "../store/order-actions";
import { ordersActions } from "../store/orders";
import { useState } from "react";
import { useActionState } from "react";

function CheckoutForm({ cartItems, totalAmount, onSuccess, onClose }) {
    const dispatch = useDispatch();

    const checkoutAction = async (prevState, formData) => {
        const customerData = Object.fromEntries(formData.entries());

        const orderPayload = {
            items: cartItems,
            customer: customerData,
            totalAmount: +totalAmount,
            date: new Date().toISOString(),
        };

        try {
            await dispatch(sendOrderData(orderPayload));
            dispatch(ordersActions.addOrder(orderPayload));
            return { success: true };
        } catch (err) {
            return { error: err.message };
        }
    };

    const [formState, formAction, pending] = useActionState(checkoutAction, null);

    if (formState?.success) {
        return (
            <>
                <h2>Success!</h2>
                <p>Your order was placed successfully.</p>
                <p className="modal-actions">
                    <Button onClick={onSuccess}>Okay</Button>
                </p>
            </>
        );
    }

    let actions = (
        <>
            <Button type="button" textOnly={true} onClick={onClose}>
                Close
            </Button>
            <Button type="submit">Submit Order</Button>
        </>
    );

    if (pending) {
        actions = <span>Sending order data...</span>;
    }

    return (
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount: ₹{totalAmount}</p>

            <Input label="Full Name" id="name" type="text" />
            <Input label="E-Mail Address" id="email" type="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {formState?.error && (
                <Error title="Failed to submit order" message={formState.error} />
            )}

            <p className="modal-actions">{actions}</p>
        </form>
    );
}

export default function Checkout() {
    const dispatch = useDispatch();
    const userProgress = useSelector((state) => state.progress);
    const cartItems = useSelector((state) => state.cart);
    const isOpen = userProgress === "checkout";

    const totalAmount = cartItems
        .reduce((acc, item) => acc + item.price * item.quantity * 70, 0)
        .toFixed(2);

    const [formKey, setFormKey] = useState(0);

    const handleCloseCheckout = () => {
        dispatch(userProgressActions.hideCheckout());
        setFormKey((prev) => prev + 1);
    };

    const clearTempCart = async () => {
        try {
            await fetch(
                "https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com/temp-cart.json",
                {
                    method: "DELETE",
                }
            );
        } catch (err) {
            console.error("Failed to clear temp cart", err);
        }
    };

    const handleFinish = async () => {
        dispatch(userProgressActions.hideCheckout());
        dispatch(cartActions.clearCart());
        await clearTempCart();
        setFormKey((prev) => prev + 1);
    };

    return (
        <Modal open={isOpen} onClose={handleCloseCheckout}>
            <CheckoutForm
                key={formKey}
                cartItems={cartItems}
                totalAmount={totalAmount}
                onSuccess={handleFinish}
                onClose={handleCloseCheckout}
            />
        </Modal>
    );
}
