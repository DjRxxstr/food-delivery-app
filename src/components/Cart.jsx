import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cart-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/user-progress-context";
import CartItem from "./CartItem";
import {useDispatch, useSelector} from 'react-redux';
import { userProgressActions } from "../store/user-progress";
import { cartActions } from "../store/cart";

export default function Cart(){
    const dispatch = useDispatch();
    const userProgress = useSelector(
        state=>state.progress
    )

    const isOpen = (userProgress === 'cart');

    const cartItems = useSelector(state => state.cart);

    let cartTotal = 0;

    cartItems.forEach((item)=>{
        cartTotal = cartTotal + (item.quantity * item.price);
    })


    function handleAddItem(item){
        dispatch(cartActions.addToCart(item));
        console.log(item);
    }

    function handleRemoveItem(item){
        dispatch(cartActions.removeFromCart(item));
    }

    function handleClearCart(){
        dispatch(cartActions.clearCart());
    }

    function handleShowCheckout(){
        dispatch(userProgressActions.showCheckout());
    }

    function handleCloseCart() {
        dispatch(userProgressActions.hideCart());
    }

    return (
        <Modal className="cart" 
               open={isOpen}
               onClose={isOpen ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (<p>
                No items added to cart. Close to add meals.
            </p>): (<><ul>
                {cartItems.map(
                    (item) => (
                        <CartItem key={item.id} 
                                  item={item}
                                  onAdd={()=>handleAddItem(item)}
                                  onRemove={()=>handleRemoveItem(item)}/>
                    )
                )}
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(cartTotal * 70)}
            </p></>)}
            

            <p className="modal-actions">
                <Button textOnly={true} 
                        onClick={handleCloseCart}>
                            Close
                </Button>

                {cartItems.length !== 0 ? (
                    <>
                        <Button textOnly={false}
                            onClick={
                                handleShowCheckout
                                }>
                                Go to Checkout
                        </Button>

                        <Button textOnly={true}
                                onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </>
                    )
                    :
                    (<></>)}
            </p>
        </Modal>
    );
}