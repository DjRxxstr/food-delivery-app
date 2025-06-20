import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { fetchMealsData } from "./store/meals-action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import Error from "./components/Error";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const [mealsIsLoading, setMealsIsLoading] = useState(false);
  const [mealsError, setMealsError] = useState(null);

  const [cartIsLoaded, setCartIsLoaded] = useState(false);
  const [sendCartError, setSendCartError] = useState(null);
  const [fetchCartError, setFetchCartError] = useState(null);

  const cartItems = useSelector(state => state.cart);

  useEffect(
    () => {
      dispatch(fetchMealsData(setMealsIsLoading, setMealsError));
    }, [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCartData(setCartIsLoaded, setFetchCartError));
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (!cartIsLoaded) {
      return;
    }

    dispatch(sendCartData(cartItems, setSendCartError));
  }, [cartItems, dispatch, cartIsLoaded]);

  return (
    <>
      <Header></Header>

      {mealsError && (<Error title="ERROR!" message={mealsError} />)}

      {!mealsError && mealsIsLoading ?
        (<p id="meals" className="center">Loading Meals...</p>) : (<Menu></Menu>)}

      <Cart isError={sendCartError || fetchCartError} message={sendCartError || fetchCartError}></Cart>
      <Checkout />
    </>
  );
}

export default App;
