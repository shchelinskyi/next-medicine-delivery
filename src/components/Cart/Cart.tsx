import CartProduct from "@/components/CartProduct";
import {useAppSelector} from "@/lib/hooks";
import s from "./Cart.module.scss";


const Cart = () => {
    const cartProducts = useAppSelector(state => state.cart.cartItems);

    return (
        <div className={s.container}>
            {cartProducts.length > 0 && cartProducts.map((cartItem) => <CartProduct key={cartItem._id} cartItem={cartItem}/>)}
            {cartProducts.length === 0 &&
                <div className={s.message}>The cart is empty. Please add some products.</div>
            }
        </div>
    );
};

export default Cart;
