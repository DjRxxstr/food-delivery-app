import { cartActions } from "./cart";

export const sendCartData = (cartItems, setSendCartError) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch('https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com/temp-cart.json',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartItems)

                }

            );

            if (!response.ok) {
                throw new Error('Sending cart data faied!');
            }

            const data = await response.json();

            console.log("Firebase response:", data)

        };

        try {
            await sendRequest();
        }
        catch (error) {
            setSendCartError(error.message);
            console.log(error.message);
        }
    }
}

export const fetchCartData = (setCartIsLoaded, setFetchCartError) => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response =
                await fetch('https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com/temp-cart.json');

            if (!response.ok) {
                throw new Error('Fetchig cart data faied!');
            }

            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            const loadedCart = [];

            for (const key in cartData) {
                loadedCart.push({
                    id: cartData[key].id,
                    name: cartData[key].name,
                    quantity: cartData[key].quantity,
                    price: cartData[key].price,
                });
            }

            dispatch(cartActions.setCart(loadedCart));
            setCartIsLoaded(true);
        }
        catch (error) {
            setFetchCartError(error.message);
            console.log(error.message);
        }
    }
}