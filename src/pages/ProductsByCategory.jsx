import React, { useEffect, useState } from "react";
import PostService from "../API/ProductService";
import MyButton from "../UI/button/MyButton";
import Loader from "../UI/Loader/Loader";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import SearchedAndSortedProducts from "../UI/SearchedAndSortedProducts";
import favoriteIcon from "../images/favoriteIcon.svg";
import favoriteIconActive from "../images/favoriteIconActive.svg";
import blackBuyIcon from "../images/blackBuyIcon.svg";
import ratingIcon from "../images/ratingIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

function ProductsByCategory() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState({ query: '' });
    const dispatch = useDispatch();
    const searchedAndSortedProducts = useProducts(products, filter.query, filter.sort);
    const favoriteItems = useSelector((state) => state.favorites.items);

    useEffect(() => {
        async function fetchProductsByCategory() {
            setIsLoading(true);
            const products = await PostService.getProductsByCategory(category);
            const productsWithDiscount = products.map(product => ({
                ...product,
                discountedPrice: calculateDiscountedPrice(product.price, product.discountPercentage),
            }));
            setProducts(productsWithDiscount);
            setIsLoading(false);
        }
        fetchProductsByCategory();
    }, [category]);

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
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

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="products_by_category_container">
            <SearchedAndSortedProducts
                filter={filter}
                setFilter={setFilter}
            />
            {searchedAndSortedProducts.length > 0 ? (
                <ul className="products_by_category_list">
                    {searchedAndSortedProducts.map(product => {
                        const ProductsByCategorydiscountPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
                        const isFavorite = favoriteItems.some(item => item.id === product.id);
                        return (
                            <li key={product.id} className="products_by_category_list_item">
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
                                <Link to={`/products/${product.id}`} className="products_by_category_link">
                                    <img
                                        src={product.thumbnail}
                                        className="products_by_category_list_item_img"
                                        alt={product.title}
                                    />
                                    <h2 className="products_by_category_list_item_h">{product.title}</h2>
                                    <div className="products_by_category_price_and_rating_container">
                                        <div className="price_container">
                                            {product.discountPercentage ? (
                                                <>
                                                    <p className="products_list_item_p" style={{ textDecoration: 'line-through' }}>
                                                        {product.price}$
                                                    </p>
                                                    <p className="products_list_item_discount_p">
                                                        {ProductsByCategorydiscountPrice.toFixed(2)}$
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="products_list_item_p">{product.price}$</p>
                                            )}
                                        </div>
                                        <div className="rating_container">
                                            <img
                                                src={ratingIcon}
                                                alt="Рейтинг"
                                            />
                                            <p className="rating_p">
                                                {product.rating}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="products_by_category_button_container">
                                    <MyButton
                                        style={{width: "95%", height: "40px"}}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Добавить в корзину
                                        <img
                                            src={blackBuyIcon}
                                            alt="Добавить в корзину"
                                        />
                                    </MyButton>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <h2 className="no_products_by_category">Нет продуктов в этой категории</h2>
            )}
        </div>
    );
}

export default ProductsByCategory;
