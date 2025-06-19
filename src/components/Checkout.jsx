import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./Error";
import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../store/user-progress";
import { cartActions } from "../store/cart";
import { sendOrderData } from "../store/order-actions";
import { ordersActions } from "../store/orders";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
  const dispatch = useDispatch();
  const userProgress = useSelector((state) => state.progress);
  const cartItems = useSelector((state) => state.cart);
  const isOpen = userProgress === "checkout";

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const [formKey, setFormKey] = useState(0); // Unique key to reset formState

  const handleCloseCheckout = () => {
    dispatch(userProgressActions.hideCheckout());
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
    setFormKey((prev) => prev + 1); // Force form to reset when reopened
  };

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

  let actions = (
    <>
      <Button type="button" textOnly={true} onClick={handleCloseCheckout}>
        Close
      </Button>

      <Button textOnly={false} type="submit">
        Submit Order
      </Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>;
  }

  if (formState?.success && isOpen) {
    return (
      <Modal open={isOpen} onClose={handleCloseCheckout}>
        <h2>Success!</h2>
        <p>Your order was placed successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={handleCloseCheckout}>
      <form action={formAction} key={formKey}>
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
    </Modal>
  );
}