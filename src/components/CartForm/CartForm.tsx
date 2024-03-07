"use client"
import { FC, MutableRefObject } from 'react';
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import {Input, Modal} from 'antd';
import {removeAllCartProducts} from "@/lib/store/features/cart/cartSlice";
import {getCurrentDate} from "@/tools/getCurrentData";
import {CartItemToSend, sendOrderToDB} from "@/tools/sendOrderToDB";
import {removeProductsFromCartLocalStorage} from "@/tools/actionsWithLocalStorage";
import s from "./CartForm.module.scss";

const { TextArea } = Input;

type FormsTypesValue = {
    name: string;
    email: string;
    phone: string;
    address: string
}


const initialValues: FormsTypesValue  = {
    name: "",
    email: "",
    phone: "",
    address: ""
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .matches(/^380\d{9}$/, 'Phone number must be in format 380501112233')
        .required("Required"),
    address: Yup.string().required("Required"),
});

type CartFormProps = {
    formRef:MutableRefObject<any>;
}

export interface CartFormType {
    submitForm: () => void;
}

const success = () => {
    Modal.success({
        content: 'Your order has been accepted',
    });
};


const CartForm: FC<CartFormProps> = ({formRef}) => {
    const total =  useAppSelector(state => state.cart.total);
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleSubmit = (values: FormsTypesValue, {setSubmitting, resetForm}:  FormikHelpers<FormsTypesValue>) => {

        const orderDate = getCurrentDate();

        const {name, email, phone, address} = values;
        const cartItemsToOrder = cartItems.map(({_id, price, quantity}):CartItemToSend => ({product:{_id}, price, quantity}));

        const cartData = {
            orderDate,
            name,
            email,
            phone,
            address,
            products : [...cartItemsToOrder],
            total
        }

        sendOrderToDB(cartData);

        resetForm();
        dispatch(removeAllCartProducts());
        removeProductsFromCartLocalStorage();
        router.push("/");
        success();
    };


    return (
        <div className={s.formWrapper}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                innerRef={formRef}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className={s.formItem}>
                            <div className={s.label}>Name:</div>
                            <Field type="text" name="name" placeholder="Alex Fox" as={Input}/>
                            <ErrorMessage name="name" component="div" className={s.error}/>
                        </div>
                        <div className={s.formItem}>
                            <div className={s.label}>Email:</div>
                            <Field type="text" name="email" placeholder="user@mail.com" as={Input}/>
                            <ErrorMessage name="email"  component="div" className={s.error}/>
                        </div>
                        <div className={s.formItem}>
                            <div className={s.label}>Phone:</div>
                            <Field type="text" name="phone"  placeholder="380501112233" as={Input}/>
                            <ErrorMessage name="phone"  component="div" className={s.error}/>
                        </div>
                        <div className={s.formItem}>
                            <div className={s.label}>Address:</div>
                            <Field type="text" name="address" placeholder="Kiev, st. Shchevchenko, 21" as={TextArea}/>
                            <ErrorMessage name="address"  component="div" className={s.error}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CartForm;
