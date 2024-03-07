import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPharmacies = createAsyncThunk(
    'pharmacies/fetchPharmacies',
    async () => {
        const response = await axios.get('https://medecine-delivery.onrender.com/api/pharmacies');
        return response.data;
    }
);

export const fetchPharmacyProducts = createAsyncThunk(
    'pharmacies/fetchPharmacyProducts',
    async (pharmacyId:string) => {
        const response = await axios.get(`https://medecine-delivery.onrender.com/api/inventories/${pharmacyId}/products`);
        return response.data;
    }
);

export const fetchPharmacyProductsUp = createAsyncThunk(
    'pharmacies/fetchPharmacyProductsUp',
    async (pharmacyId:string) => {
        const response = await axios.get(`https://medecine-delivery.onrender.com/api/inventories/${pharmacyId}/products/sortedUp`);
        return response.data;
    }
);

export const fetchPharmacyProductsDown = createAsyncThunk(
    'pharmacies/fetchPharmacyProductsDown',
    async (pharmacyId:string) => {
        const response = await axios.get(`https://medecine-delivery.onrender.com/api/inventories/${pharmacyId}/products/sortedDown`);
        return response.data;
    }
);


type StoreItem = {
    _id: string,
    name: string,
}

export type ProductsType = {
    _id: string,
    pharmacy: string,
    price: number,
    product: {
        _id: string,
        name: string,
        imgSrc: string,
    },
    quantity: number
}

type PharmaciesTypes = {
    stores: StoreItem[],
    activeStore: string,
    currentProducts: ProductsType[]
}

const initialState:PharmaciesTypes = {
    stores: [],
    activeStore:"",
    currentProducts: [],
}

const pharmaciesSlice = createSlice({
    name: 'pharmacies',
    initialState,
    reducers: {
        setActiveStore: (state, action) => {
            state.activeStore = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPharmacies.fulfilled, (state, action) => {
            state.stores = action.payload;
            const {_id} = action.payload[0];
            state.activeStore = _id;
        });
        builder.addCase(fetchPharmacyProducts.fulfilled, (state, action) => {
            state.currentProducts = action.payload;
        });
        builder.addCase(fetchPharmacyProductsUp.fulfilled, (state, action) => {
            state.currentProducts = action.payload;
        });
        builder.addCase(fetchPharmacyProductsDown.fulfilled, (state, action) => {
            state.currentProducts = action.payload;
        });
    },
});

export const {
    setActiveStore
} = pharmaciesSlice.actions;

export default pharmaciesSlice.reducer;