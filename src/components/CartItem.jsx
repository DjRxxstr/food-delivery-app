import { currencyFormatter } from "../util/formatting";

export default function CartItem({item, onAdd, onRemove, ...props}){
    return(
        <li className="cart-item" {...props}>
            <p>{item.name} - {item.quantity} X {currencyFormatter.format(item.price * 70)}</p>
            <p className="cart-item-actions">
                <button onClick={onRemove}>-</button>
                <span>QTY</span>
                <button onClick={onAdd}>+</button>
            </p>
        </li>
    );
}