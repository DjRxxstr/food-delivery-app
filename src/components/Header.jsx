import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userProgressActions } from '../store/user-progress';

export default function Header() {
    const dispatch = useDispatch();

    function handleShowCart() {
        dispatch(userProgressActions.showCart());
    }

    const cartItems = useSelector(state => state.cart);

    let numberOfItems = 0;

    cartItems.forEach(item => {
        numberOfItems += item.quantity;
    });

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Logo"></img>
                <h1>CraveCart</h1>
            </div>

            <nav>
                <Button textOnly={true}
                    className="cart-button"
                    onClick={handleShowCart}
                >
                    <i class="fa fa-shopping-cart"></i> Cart
                    ({numberOfItems})
                </Button>
            </nav>
        </header>
    );
}