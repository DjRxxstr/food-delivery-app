import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/cart-context";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/user-progress-context";
import CartItem from "./CartItem";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const isOpen = (userProgressCtx.progress === 'cart');

    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function handleAddItem(item){
        cartCtx.addItem(item);
        console.log(item);
    }

    function handleRemoveItem(id){
        cartCtx.removeItem(id);
    }

    function handleClearCart(){
        cartCtx.clearCart();
    }

    function handleShowCheckout(){
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" 
               open={isOpen}
               onClose={isOpen === true ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            {cartCtx.items.length === 0 ? (<p>
                No items added to cart. Close to add meals.
            </p>): (<><ul>
                {cartCtx.items.map(
                    (item) => (
                        <CartItem key={item.id} 
                                  item={item}
                                  onAdd={()=>handleAddItem(item)}
                                  onRemove={()=>handleRemoveItem(item.id)}/>
                    )
                )}
            </ul>
            <p className="cart-total">
                {cartCtx.cartTotal}
            </p></>)}
            

            <p className="modal-actions">
                <Button textOnly={true} 
                        onClick={handleCloseCart}>
                            Close
                </Button>

                {cartCtx.items.length !== 0 ? (
                    <>
                        <Button textOnly={false}
                            onClick={handleShowCheckout}>
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