"use client"
import {useEffect} from "react";
import {Button, Spin} from "antd";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {fetchPharmacies, fetchPharmacyProducts, setActiveStore} from "@/lib/store/features/pharmacies/pharmaciesSlice";
import s from "./AsideMenu.module.scss";


const AsideMenu = () => {

    const pharmacies = useAppSelector(state => state.pharmacies.stores);
    const activeStore = useAppSelector(state => state.pharmacies.activeStore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPharmacies());
    }, [dispatch]);

    useEffect(() => {
        if (pharmacies.length > 0) {
            dispatch(fetchPharmacyProducts(pharmacies[0]._id));
        }
    }, [pharmacies, dispatch]);

    const handleLoadProducts = (storeId:string) => {
        dispatch(fetchPharmacyProducts(storeId));
        dispatch(setActiveStore(storeId));
    };

    return (
        <div className={s.container}>
            <h4 className={s.title}>Shops:</h4>
            {pharmacies.length === 0 &&
                <div className={s.loading}>
                    <Spin/>
                    <Spin/>
                    <Spin/>
                    <Spin/>
                </div>}
            {pharmacies.length !== 0 &&
                <ul className={s.list}>
                {pharmacies.map((pharmacy) =>
                    <li key={pharmacy.name}>
                        <Button type="default" style={{backgroundColor: activeStore === pharmacy._id ? "#ebe8e8" : "inherit"}} onClick={() => handleLoadProducts(pharmacy._id)}>{pharmacy.name}</Button>
                    </li>
                )
                }
            </ul>
            }

        </div>
    );
};

export default AsideMenu;
