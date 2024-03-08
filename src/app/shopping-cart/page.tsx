"use client"

import { useRef, MutableRefObject } from "react";
import {useAppSelector} from "@/lib/hooks";
import CartForm from "@/components/CartForm";
import { CartFormType } from "@/components/CartForm/CartForm";
import Cart from "@/components/Cart";
import {Button} from "antd";
import s from "./page.module.scss";


const ShoppingCartPage = () => {

    const total = useAppSelector(state => state.cart.total);
    const cartProducts = useAppSelector(state => state.cart.cartItems);
    const formRef:MutableRefObject<CartFormType | null> = useRef(null);


    const handleSubmitOutside = () => {
        if (formRef.current) {
            formRef.current.submitForm();
        }
    };

    return (
        <>
            <div className={s.container}>
                <CartForm formRef={formRef}/>
                <Cart/>
            </div>
            <div className={s.totalBlockContent}>
                <div className={s.total}>Total Price: {total} UAH</div>
                <Button type="primary" disabled={cartProducts.length === 0} onClick={handleSubmitOutside}>
                    Submit
                </Button>
            </div>
        </>

    );
};

export default ShoppingCartPage;
