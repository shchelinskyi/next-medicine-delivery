import { CartItem } from "@/lib/store/features/cart/cartSlice";

export const addItemToCartLocalStorage = (productItem: CartItem) => {
    try {
        const existingCartString: string | null = localStorage.getItem('cartItems');
        const existingCart: CartItem[] = existingCartString ? JSON.parse(existingCartString):[];
        const existingCartItemIndex = existingCart.findIndex((item: CartItem) => item._id === productItem._id);
        const updatedCart = [...existingCart];

        if (existingCartItemIndex !== -1) {
            updatedCart[existingCartItemIndex].quantity += 1;
        } else {
            updatedCart.push(productItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};


export const removeCartItemFromLocalStorage = (productItem: CartItem) => {

    const existingCartString: string | null = localStorage.getItem('cartItems');
    const existingCart: CartItem[] = existingCartString ? JSON.parse(existingCartString):[];
    const existingCartItemIndex = existingCart.findIndex((item: CartItem) => item._id === productItem._id);
    const updatedCart = [...existingCart];
    if (updatedCart[existingCartItemIndex].quantity > 1) {
        updatedCart[existingCartItemIndex].quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
        const newArr = existingCart.filter((item: CartItem) => item._id !== productItem._id);
        localStorage.setItem('cartItems', JSON.stringify(newArr));
    }
};

export const removeProductsFromCartLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify([]));
}
