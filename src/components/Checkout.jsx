import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cart-context";
import Input from "./UI/Input";
import UserProgressContext from "../store/user-progress-context";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Checkout(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {data, 
           isFetching: isSending, 
           error, 
           sendRequest,
           clearData} 
        = useHttp('http://localhost:3000/orders', 
            requestConfig);

    const isOpen = userProgressCtx.progress === "checkout";

    function handleCloseCheckout(){
        userProgressCtx.hideCheckout();
    }

    function handleFnish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, fd){
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest(
            JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
    }

    const [formState, formAction, pending]
        = useActionState(checkoutAction, null);

    let actions = (
        <>
            <Button type="button" 
                    textOnly={true}
                    onClick={handleCloseCheckout}>
                    Close
            </Button>

            <Button textOnly={false} type="submit">
                Submit Order
            </Button>
        </>
    );

    if(pending){
        actions = (<span>Sending order data...</span>)
    }

    if(data && !error){
        return (
            <Modal open={isOpen} onClose={handleCloseCheckout}>
                <h2>Success!</h2>
                <p>Your order was placed successfully.</p>

                <p className="modal-actions">
                    <Button onClick={handleFnish}>
                        Okay
                    </Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={isOpen} onClose={handleCloseCheckout}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {cartCtx.cartTotal}</p>

                <Input label="Full Name" 
                       id="name" 
                       type="text"/>

                <Input label="E-Mail Address" 
                       id="email" 
                       type="email"/>

                <Input label="Street" type="text" id="street"/>

                <div className="control-row">
                    <Input label="Postal Code" 
                           type="text" 
                           id="postal-code"/>

                    <Input label="City" 
                           type="text" 
                           id="city"/>
                </div>

                {error &&
                <Error title="Failed to submit order"
                       message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}