import { useContext, useEffect, useState } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/cart-context";
import Modal from "./UI/Modal";

export default function MealItem({ meal }) {
  const [isOpen, setIsOpen] = useState(false);

  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
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
      }, 3000);
    }

    
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
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
            onClick={handleAddMealToCart}
          >
            Add to Cart
          </Button>
        </div>
      </article>

      <Modal open={isOpen} className="item-added">
        <div className="center">
          <p><strong>Item added to cart</strong></p>
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
