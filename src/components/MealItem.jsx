import { useContext, useEffect, useState } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/cart-context";
import Modal from "./UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";

export default function MealItem({ meal }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // const cartCtx = useContext(CartContext);

  // const cartItems = useSelector(state => state.cart);



  function handleAddMealToCart(item) {
    dispatch(cartActions.addToCart({...item, quantity: 1}))
    setIsOpen(true);
  }

  function handleCloseItemAddedModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="meal-item">
      <article>
        <img
          src={meal.image}
          alt={meal.name}
        />

        <div>
          <h3>{meal.name}</h3>
          <span className="meal-item-price">
            {currencyFormatter.format(meal.price * 70)}
          </span>
          <p className="meal-item-description">{meal.description}</p>
        </div>

        <div>
          <Button
            textOnly={false}
            className="meal-item-actions"
            onClick={()=>handleAddMealToCart(meal)}
          >
            Add to Cart
          </Button>
        </div>
      </article>
      

      <Modal open={isOpen} className="item-added">

        <div className="center">

            <div className="item-added-block">
                <div>
                    <span className="item-added-text">
                        Item added to cart
                    </span>
                </div>
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
            </div>
            
          <div className="modal-actions">
            <Button
              textOnly={true}
              onClick={handleCloseItemAddedModal}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
