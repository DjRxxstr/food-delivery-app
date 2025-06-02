import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/cart-context';
import UserProgressContext from '../store/user-progress-context';

export default function Header(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    let numberOfItems = 0;
    
    cartCtx.items.map((item) => {
        numberOfItems += item.quantity
    });

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    return (
        <header id = "main-header">
            <div id = "title">
                <img src={logoImg}alt="Logo"></img>
                <h1>CraveCart</h1>
            </div>

            <nav>
                <Button textOnly={true} 
                        className="" 
                        onClick={handleShowCart}
                        >
                    Cart ({numberOfItems})
                </Button>
            </nav>
        </header>
    );
}