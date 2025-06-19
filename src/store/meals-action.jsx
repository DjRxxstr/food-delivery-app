import { mealsActions } from "./meals"

export const fetchMealsData = (setMealsIsLoading) => {
    return async (dispatch) => {
        setMealsIsLoading(true);
        const fetchMeals = async () => {
            const response = await fetch('https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com/available-meals.json');

            if (!response.ok) {
                throw new Error('Could not fetch meals data');
            }

            const data = await response.json();

            return Object.values(data);
        };

        try {
            const mealsData = await fetchMeals();
            dispatch(mealsActions.setMeals(mealsData));
        } catch (error) {
            //...
            console.log(error.message);
        } finally {
            setMealsIsLoading(false);
        }
    }
}