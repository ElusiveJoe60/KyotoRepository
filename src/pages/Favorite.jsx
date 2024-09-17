import React from "react";
import MyButton from "../UI/button/MyButton";
import { Link } from "react-router-dom";
import { removeFavorite } from "../store/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

const Favorite = () => {
    const favoriteItems = useSelector((state) => state.favorites.items);
    const dispatch = useDispatch();

    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price - (price * discountPercentage / 100);
    };

    const handleToggleFavorite = (product) => {
        const favoriteItem = favoriteItems.find(item => item.id === product.id);

        dispatch(removeFavorite(favoriteItem.favoriteItemId)); 
    };

    return (
        <div className="favorite">
            <h2 className="favorite_top_text">Избранные товары</h2>
            {favoriteItems.length > 0 ? (
                <ul className="favorite_products_list">
                    {favoriteItems.map(product => (
                        <li key={product.favoriteItemId} className="favorite_products_list_item">
                            <Link to={`/products/${product.id}`} className="favorite_products_link">
                                <img
                                    src={product.thumbnail}
                                    alt="Изображение продукта"
                                    className="favorite_products_list_item_img"
                                />
                                <h2 className="favorite_products_list_item_text">{product.title}</h2>
                                <div className="another_price_container">
                                    {product.discountPercentage ? (
                                        <>
                                            <p className="products_list_item_p" style={{ textDecoration: 'line-through' }}>
                                                {product.price}$
                                            </p>
                                            <p className="products_list_item_discount_p">
                                                {calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}$
                                            </p>
                                        </>
                                    ) : (
                                        <p className="products_list_item_p">{product.price}$</p>
                                    )}
                                </div>
                            </Link>
                            <div className="favorite_button_container">
                                <MyButton
                                    onClick={() => handleToggleFavorite(product)}
                                >
                                    Удалить из избранного
                                </MyButton>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty_favorite_container">
                    <div className="favorite_text">
                        <h1 className="favorite_text_main">Вы пока ничего не добавили в избранное</h1>
                        <p className="favorite_text_tip">
                            Для того, чтобы добавить товары в избранное - выберите их на главной странице
                        </p>
                    </div>
                    <Link to="/products" className="favorite_to_main_link">
                        <MyButton style={{ width: '110%' }}>
                            Вернуться на главную страницу
                        </MyButton>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Favorite