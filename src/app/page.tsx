import AsideMenu from "@/components/AsideMenu";
import ProductsBlock from "@/components/ProductsBlock";
import s from "./page.module.scss";

const HomePage = () => {
    return (
        <div className={s.container}>
            <AsideMenu/>
            <ProductsBlock/>
        </div>
    );
}

export default HomePage;
