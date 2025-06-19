import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Modal from "./components/UI/Modal";
// import { CartContextProvider } from "./store/cart-context";
import { UserProgressContextProvider } from "./store/user-progress-context";
import { fetchMealsData } from "./store/meals-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const [mealsIsLoading, setMealsIsLoading] = useState(false);
  const [cartIsLoaded, setCartIsLoaded] = useState(false);

  // const mealsData = useSelector(state => state.meals);
  const cartItems = useSelector(state=>state.cart)
  const userProgress = useSelector(state => state.progress);

  useEffect(
    () => {
      dispatch(fetchMealsData(setMealsIsLoading));
    }, [dispatch]
  );

  useEffect(()=>{
    dispatch(fetchCartData(setCartIsLoaded));
  },[dispatch]);

  useEffect(()=>{
    if (isInitial){
        isInitial = false;
        return;
      }

      if (!cartIsLoaded){
        return;
      }

    dispatch(sendCartData(cartItems));
  },[cartItems,dispatch, cartIsLoaded]);

  return (
    <>
          <Header></Header>

          {mealsIsLoading ? 
          (<p id="meals" className="center">Loading Meals...</p>) : (<Menu></Menu>)}
          
          <Cart></Cart>
          <Checkout />
    </>
  );
}

export default App;
