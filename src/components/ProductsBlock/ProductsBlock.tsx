"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ProductCard from "@/components/ProductCard";
import s from "./ProductsBlock.module.scss";
import {
    fetchPharmacyProductsDown,
    fetchPharmacyProductsUp, ProductsType
} from "@/lib/store/features/pharmacies/pharmaciesSlice";
import { useEffect, useState } from "react";

const ProductsBlock = () => {
    const [productsArr, setProductsArr] = useState<ProductsType[]>([]);
    const currentProducts = useAppSelector(state => state.pharmacies.currentProducts);
    const favorites = useAppSelector(store => store.favorites.favouriteItems);
    const activeStore = useAppSelector(state => state.pharmacies.activeStore);
    const dispatch = useAppDispatch();

    const handleSortByPriceUp = () => {
        dispatch(fetchPharmacyProductsUp(activeStore));
    };

    const handleSortByPriceDown = () => {
        dispatch(fetchPharmacyProductsDown(activeStore));
    };

    useEffect(() => {
        const sortedProducts = currentProducts.slice().sort((a, b) => {
            const indexA = favorites.indexOf(a.product._id);
            const indexB = favorites.indexOf(b.product._id);
            return indexB - indexA;
        });
        setProductsArr([...sortedProducts]);
    }, [currentProducts, favorites]);

    return (
        <div className={s.container}>
            <div className={s.sortBlock}>
                <div className={s.sortItem} onClick={handleSortByPriceUp}><span>sort by price</span> <span>&#8593;</span></div>
                <div className={s.sortItem} onClick={handleSortByPriceDown}><span>sort by price</span> <span>&#8595;</span></div>
            </div>
            <div className={s.content}>
                {productsArr.length > 0 ?
                    productsArr.map(({ product, price }) => (
                        <ProductCard key={product.name} productItem={{ ...product, price }} />
                    ))
                    :
                    <div>No products available</div>
                }
            </div>
        </div>
    );
};

export default ProductsBlock;


