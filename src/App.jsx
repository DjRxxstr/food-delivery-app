import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Modal from "./components/UI/Modal";
import { CartContextProvider } from "./store/cart-context";
import { UserProgressContextProvider } from "./store/user-progress-context";

function App() {
  return (
    <>
    <UserProgressContextProvider>

        <CartContextProvider>

          <Header></Header>
          <Menu></Menu>
          <Cart></Cart>
          <Checkout></Checkout>

        </CartContextProvider>

    </UserProgressContextProvider>
    
    </>
  );
}

export default App;
