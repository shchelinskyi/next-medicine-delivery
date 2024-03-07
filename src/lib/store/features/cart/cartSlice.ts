import {createSlice} from '@reduxjs/toolkit';
import {removeCartItemFromLocalStorage} from "@/tools/actionsWithLocalStorage";

export type CartItem = {
    _id: string,
    name: string,
    imgSrc: string,
    price: number,
    quantity: number
}

type CartStateProps = {
    cartItems: CartItem[],
    total: number,
}
let existingCart: CartItem[] = [];
let initTotal: number = 0;

if (typeof window !== 'undefined') {
    const existingCartString: string | null = localStorage.getItem('cartItems');
    existingCart = existingCartString ? JSON.parse(existingCartString) : [];
    initTotal = existingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

const initialState: CartStateProps = {
    cartItems:  existingCart,
    total: initTotal,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { _id } = action.payload;
            const cartItem = action.payload;
            const existingCartItemIndex = state.cartItems.findIndex(item => item._id === _id);
            if (existingCartItemIndex !== -1) {
                const updatedCart = [...state.cartItems];
                updatedCart[existingCartItemIndex].quantity += 1;
                state.cartItems = [...updatedCart];
            } else {
                const updatedCart = [...state.cartItems, cartItem];
                state.cartItems = [...updatedCart];
            }
        },
        calculateTotal: (state) => {
            state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
        removeFromCartOne: (state, action) => {
            const { _id } = action.payload;
            const existingCartItemIndex = state.cartItems.findIndex(item => item._id === _id);

            if (existingCartItemIndex !== -1) {
                const updatedCart = [...state.cartItems];

                if (updatedCart[existingCartItemIndex].quantity > 1) {
                    updatedCart[existingCartItemIndex].quantity -= 1;
                } else {
                    updatedCart.splice(existingCartItemIndex, 1);
                }

                state.cartItems = [...updatedCart];
            }
        },
        removeAllCartProducts:(state) => {
            state.cartItems =  [];
            state.total = 0;
        },
    },
});

export const {
    addToCart,
    calculateTotal,
    removeFromCartOne,
    removeAllCartProducts,
} = cartSlice.actions;


export default cartSlice.reducer;