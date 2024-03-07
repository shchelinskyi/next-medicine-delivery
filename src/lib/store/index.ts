import {configureStore} from '@reduxjs/toolkit';
import pharmaciesSlice from "@/lib/store/features/pharmacies/pharmaciesSlice";
import cartSlice from "@/lib/store/features/cart/cartSlice";
import favoritesSlice from "@/lib/store/features/favorites/favoritesSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            pharmacies: pharmaciesSlice,
            cart: cartSlice,
            favorites: favoritesSlice
        },
    })
}



export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']