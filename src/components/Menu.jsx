import MealItem from "./MealItem";
import { useSelector } from "react-redux";

export default function Menu() {
    const availableMeals = useSelector(state => state.meals)

    return (
        <main>
            <div id="meals">
                {availableMeals.map((meal) => (
                    <MealItem meal={meal} key={meal.id} />
                ))}
            </div>



        </main>
    );
}