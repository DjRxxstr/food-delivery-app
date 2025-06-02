import { useReducer, useEffect, createContext } from 'react';
import { currencyFormatter } from '../util/formatting';

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'initialize') {
    return { ...state, items: action.items };
  }

  if (action.type === 'add_item') {
    const existingIndex = state.items.findIndex(i => i.id === action.item.id);
    const updatedItems = [...state.items];

    if (existingIndex >= 0) {
      const existingItem = updatedItems[existingIndex];
      updatedItems[existingIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'remove_item') {
    const existingIndex = state.items.findIndex(i => i.id === action.id);
    if (existingIndex < 0) return state;

    const existingItem = state.items[existingIndex];
    let updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingIndex, 1);
    } else {
      updatedItems[existingIndex] = { ...existingItem, quantity: existingItem.quantity - 1 };
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'clear_cart') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  // Fetch cart from backend once on mount
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('http://localhost:3000/temp-cart');
        if (!response.ok) throw new Error('Failed to fetch cart');
        const data = await response.json();
        dispatch({ type: 'initialize', items: data || [] });
      } catch (err) {
        console.error(err);
      }
    }
    fetchCart();
  }, []);

  // Sync cart with backend whenever items change
  useEffect(() => {
    async function syncCart() {
      try {
        await fetch('http://localhost:3000/temp-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart.items),
        });
      } catch (err) {
        console.error('Failed to sync cart:', err);
      }
    }
    syncCart();
  }, [cart.items]);

  function addItem(item) {
    dispatch({ type: 'add_item', item });
  }

  function removeItem(id) {
    dispatch({ type: 'remove_item', id });
  }

  function clearCart() {
    dispatch({ type: 'clear_cart' });
  }

  const cartTotal = cart.items.reduce((total, item) => total + item.price * 70 * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        cartTotal: currencyFormatter.format(cartTotal),
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
