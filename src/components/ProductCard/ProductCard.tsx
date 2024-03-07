import {FC, useEffect, useState} from "react";
import Image from "next/image";
import {Button, Card, message, Space} from "antd";
import {HeartOutlined, HeartFilled} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addToCart, calculateTotal} from "@/lib/store/features/cart/cartSlice";
import s from "./ProductCard.module.scss";
import {addToFavouriteItems, deleteFromFavouriteItems} from "@/lib/store/features/favorites/favoritesSlice";
import {addItemToCartLocalStorage} from "@/tools/actionsWithLocalStorage";

type ProductCardProps = {
    productItem : {
        _id:string,
        name: string,
        imgSrc: string,
        price: number,
    }
}

const ProductCard: FC<ProductCardProps> = ({productItem}) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useAppSelector(store => store.favorites.favouriteItems);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();



    useEffect(() => {
        const productItemIndex = favorites.findIndex(item => item === productItem._id);
        if (productItemIndex !== -1) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favorites, productItem._id]);


    const successAddToCart = () => {
        messageApi.open({
            type: 'success',
            content: 'Product added',
        });
    };


    const addProductToCart = () => {
        const productToCart = {...productItem, quantity: 1}
        dispatch(addToCart(productToCart ));
        dispatch(calculateTotal());
        if (typeof window !== 'undefined') {
            addItemToCartLocalStorage(productToCart);
        }

    }

    const handleToggleFavorites = () => {
        if (!isFavorite) {
            dispatch(addToFavouriteItems(productItem._id))
        } else {
            dispatch(deleteFromFavouriteItems(productItem._id))
        }
    }


    return (
        <>
            {contextHolder}
        <Card className={s.card}>
            <div className={s.favoriteIcon} onClick={handleToggleFavorites}>
                {isFavorite ?  <HeartFilled className={s.icon} style={{ color: 'green' }}/> : <HeartOutlined  className={s.icon}/>}
            </div>
            <div className={s.imgWrapper}>
                <Image src={productItem.imgSrc} className={s.img} alt={productItem.name} width={140} height={140}/>
            </div>
            <h5 className={s.title}>{productItem.name}</h5>
            <p className={s.price}>{productItem.price} UAH</p>
            <Space>
            <Button type="primary" onClick={() => { addProductToCart(); successAddToCart()}}>Add to Cart</Button>
            </Space>
        </Card>
        </>
    );
};

export default ProductCard;
