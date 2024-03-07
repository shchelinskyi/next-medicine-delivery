import axios from "axios";

export type CartItemToSend = {
    product:{
        _id: string
    },
    price: number,
    quantity: number
}

type SendOrderData = {
    orderDate: string,
    name: string,
    email: string,
    phone: string,
    address: string
    products : CartItemToSend[],
    total: number
}

export const sendOrderToDB = async (sendData:SendOrderData) : Promise<void> => {
    try {
        const response = await axios.post('https://medecine-delivery.onrender.com/api/orders', sendData);
    } catch (error) {
        console.error(error);
    }
};