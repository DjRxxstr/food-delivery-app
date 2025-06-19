import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useSelector } from "react-redux";

const requestConfig = {};

export default function Menu(){
    // const {
    //     data: availableMeals,
    //     isFetching: isFetching,
    //     error: error,
    //     sendRequest
    // } = useHttp('http://localhost:3000/meals', requestConfig, []);

    // if (isFetching){
    //     return <p className="center">Fetching Meals...</p>
    // }

    // if (error){
    //     console.log(error);
    //     return (<Error title="Failed to fetch meals"
    //            message={error}></Error>);
    // }
    const availableMeals = useSelector(state => state.meals)
    
    return (
        <main>
            <div id="meals">
                {availableMeals.map((meal) => (
                    <MealItem meal={meal} key={meal.id}/>
                ))}
            </div>

            
            
        </main>
    );
}