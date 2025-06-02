import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/cart-context";

export default function MealItem({meal}){
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart(item){
        cartCtx.addItem(meal);
    }
    
    return (
        <div className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
                
                <div>
                    <h3>{meal.name}</h3>
                    <span className='meal-item-price'>
                        {currencyFormatter.format(meal.price * 70)}
                    </span>
                    <p className='meal-item-description'>
                        {meal.description}
                    </p>
                </div>
                
                <div>
                    <Button textOnly={false} 
                            className='meal-item-actions'
                            onClick={handleAddMealToCart}>
                        Add to Cart
                    </Button>
                    {/* <button className='meal-item-actions'> */}
                     
                </div>
            </article>
            
        </div>
    );
}