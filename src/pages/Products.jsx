import React, { useEffect, useState } from "react";
import MyButton from "../UI/button/MyButton";
import PostService from "../API/ProductService";
import Loader from "../UI/Loader/Loader";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import SearchedAndSortedProducts from "../UI/SearchedAndSortedProducts";
import favoriteIcon from "../images/favoriteIcon.svg";
import favoriteIconActive from "../images/favoriteIconActive.svg";
import blackBuyIcon from "../images/blackBuyIcon.svg";
import ratingIcon from "../images/ratingIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

function Products() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({ query: '', sort: '' });
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.items); 
    const searchedAndSortedProducts = useProducts(products, filter.query, filter.sort);

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true);
            const products = await PostService.getAll();
            const productsWithDiscount = products.map(product => ({
                ...product,
                discountedPrice: calculateDiscountedPrice(product.price, product.discountPercentage),
            }));
            setProducts(productsWithDiscount);
            setIsLoading(false);
        }
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleToggleFavorite = (product) => {
        const isFavorite = favoriteItems.some(item => item.id === product.id); 

        if (isFavorite) {
            const favoriteItem = favoriteItems.find(item => item.id === product.id);
            dispatch(removeFavorite(favoriteItem.favoriteItemId)); 
        } else {
            dispatch(addFavorite(product));
        }
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="products_container">
            <SearchedAndSortedProducts
                filter={filter}
                setFilter={setFilter}
            />
            {searchedAndSortedProducts.length > 0 ? (
                <ul className="products_list">
                    {searchedAndSortedProducts.map(product => {
                        const isFavorite = favoriteItems.some(item => item.id === product.id);
                        return (
                            <li className="products_list_item" key={product.id}>
                                <button
                                    className="products_list_item_favorite_button"
                                    onClick={() => handleToggleFavorite(product)}
                                >
                                    <img
                                        src={isFavorite ? favoriteIconActive : favoriteIcon}
                                        className="products_list_item_favorite_icon"
                                        alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                                    />
                                </button>
                                <Link to={`/products/${product.id}`} className="selected_product_link">
                                    <img 
                                        src={product.thumbnail} 
                                        className="products_list_item_img"
                                        alt={product.title}
                                    />
                                    <h2 className="products_list_item_h">{product.title}</h2>
                                    <div className="products_price_and_rating_container">
                                        <div className="price_container">
                                            {product.discountPercentage ? (
                                                <>
                                                    <p className="products_list_item_p" style={{ textDecoration: 'line-through' }}>
                                                        {product.price}$
                                                    </p>
                                                    <p className="products_list_item_discount_p">
                                                        {product.discountedPrice.toFixed(2)}$
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="products_list_item_p">{product.price}$</p>
                                            )}
                                        </div>
                                        <div className="rating_container">
                                            <img
                                                src={ratingIcon}
                                                alt=""
                                            />
                                            <p className="rating_p">
                                                {product.rating}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="products_button_container">
                                    <MyButton
                                        style={{ width: "95%" }}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Добавить в корзину
                                        <img
                                            alt="Добавить в корзину"
                                            src={blackBuyIcon}
                                        />
                                    </MyButton>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h2 className="no_products_text">Нет продуктов, соответствующих вашему запросу</h2>
            )}
        </div>
    );
}

export default Products;
