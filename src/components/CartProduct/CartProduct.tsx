"use client";

import {FC} from "react";
import Image from "next/image";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import {useAppDispatch} from "@/lib/hooks";
import {addToCart, calculateTotal, CartItem, removeFromCartOne} from "@/lib/store/features/cart/cartSlice";
import s from "./CartProduct.module.scss";
import {addItemToCartLocalStorage, removeCartItemFromLocalStorage} from "@/tools/actionsWithLocalStorage";

type CartProductProps = {
    cartItem : CartItem
}

const CartProduct: FC<CartProductProps> = ({cartItem}) => {

    const dispatch = useAppDispatch();

    const handleIncrementQuantity = () => {
        dispatch(addToCart(cartItem));
        dispatch(calculateTotal());
        if (typeof window !== 'undefined') {
            addItemToCartLocalStorage(cartItem);
        }
    }

    const handleDecrementQuantity = () => {
        dispatch(removeFromCartOne(cartItem));
        dispatch(calculateTotal());
        if (typeof window !== 'undefined') {
            removeCartItemFromLocalStorage(cartItem);
        }

    }


    return (
        <div className={s.container}>
            <div className={s.imgWrapper}>
                <Image src={cartItem.imgSrc} width={180} height={140} className={s.itemImg} alt="product"/>
            </div>
            <div className={s.itemContent}>
                <h4 className={s.productTitle}>{cartItem.name}</h4>
                <p className={s.price}>Price: {cartItem.price} UAH</p>
                <div className={s.quantityBlock}>
                    <div className={s.quantity}>
                        <span>{cartItem.quantity}</span>
                        <div className={s.changeBlock}>
                            <CaretUpOutlined onClick={handleIncrementQuantity}/>
                            <CaretDownOutlined onClick={handleDecrementQuantity}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CartProduct;
