import { userProgressActions } from "./user-progress";

export const sendOrderData = (order) => {
    return async (dispatch) => {
        const sendOrderRequest = async () => {
            const response = await fetch('https://food-delivery-app-db-638c6-default-rtdb.firebaseio.com/orders.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)

                }

            );

            if (!response.ok) {
                throw new Error('Sending order data faied!');
            }

            const data = await response.json();

            console.log("Firebase response:", data)

        };

        try {
            await sendOrderRequest();
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
