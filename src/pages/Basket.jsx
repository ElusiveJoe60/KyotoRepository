import React from "react";
import MyButton from "../UI/button/MyButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/cartSlice";

const Basket = () => {
    const products = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (cartItemId) => {
        dispatch(removeItem(cartItemId));
    };

    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price - (price * discountPercentage / 100);
    };

    return (
        <div className="basket">
            <h2 className="basket_top_text">Корзина</h2>
            {products.length > 0 ? (
                <ul className="basket_products_list">
                    {products.map((product, index) => (
                        <li key={product.cartItemId} className="basket_products_list_item">
                            <Link to={`/products/${product.id}`} className="basket_products_link">
                                <img
                                    src={product.thumbnail}
                                    alt="Изображение продукта"
                                    className="basket_products_list_item_img"
                                />
                                <h2 className="basket_products_list_item_text">{product.title}</h2>
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
                            <div className="basket_button_container">
                                <MyButton
                                    onClick={() => handleRemoveFromCart(product.cartItemId)} // Используем уникальный идентификатор
                                >
                                    Удалить из корзины
                                </MyButton>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty_basket_container">
                    <div className="basket_text">
                        <h1 className="basket_main">В корзине пока пусто</h1>
                        <p className="basket_tip">
                            Для того, чтобы добавить товары в корзину - выберите их на главной странице
                        </p>
                    </div>
                    <Link to="/products" className="basket_to_main_link">
                        <MyButton style={{width: '110%'}}>
                            Вернуться на главную страницу
                        </MyButton>
                    </Link>
                </div>
            )}   
        </div>
    );
}

export default Basket;
