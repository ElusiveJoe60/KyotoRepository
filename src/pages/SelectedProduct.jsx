import React, { useEffect, useState } from "react";
import PostService from "../API/ProductService";
import MyButton from "../UI/button/MyButton";
import Loader from "../UI/Loader/Loader";
import { useParams } from "react-router-dom";
import favoriteIcon from "../images/favoriteIcon.svg";
import favoriteIconActive from "../images/favoriteIconActive.svg";
import ratingIcon from "../images/ratingIcon.svg";
import StarRating from "../UI/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

function SelectedProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.items); 

    useEffect(() => {
        async function fetchSelectedProduct() {
            try {
                setIsLoading(true);
                const selectedProduct = await PostService.getSelectedProduct(id);
                setProduct(selectedProduct);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSelectedProduct();
    }, [id]);

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };

    const formatDate = (dateString) => {
        return dateString.split('T')[0];
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

    if (!product) {
        return <h2>Не найдено такого продукта</h2>;
    }

    const isFavorite = favoriteItems.some(item => item.id === product.id);

    return (
        <div className="selected_product_container">
            <div key={product.id} className="selected_product_item">
                <div className="selected_product_item_container">
                    <div className="selected_product_item_img_container">
                        <img
                            src={product.thumbnail}
                            className="selected_product_item_img"
                            alt={product.title}
                        />
                    </div>
                    <div className="selected_product_item_text_container">
                        <h2 className="selected_product_item_h">{product.title}</h2>
                        <p className="selected_product_item_brand">{product.brand}®</p>
                        <p className="selected_product_item_description">{product.description}</p>
                        <p className="selected_product_item_return_policy">{product.returnPolicy}</p>
                    </div>
                    <div className="selected_product_item_add_to_busket">
                        <div className="favorite_and_rating_container">
                            <button
                                className="products_list_item_favorite_button"
                                onClick={() => handleToggleFavorite(product)}
                            >
                                <img
                                    src={isFavorite ? favoriteIconActive : favoriteIcon}
                                    className="selected_products_list_item_favorite_icon"
                                    alt={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                                />
                            </button>
                            <div className="rating_container">
                                <img
                                    src={ratingIcon}
                                    alt=""
                                />
                                <p className="selected_product_rating_p">
                                    {product.rating}
                                </p>
                            </div>
                        </div>
                        <div className="price_container">
                            {product.discountPercentage ? (
                                <>
                                    <p className="selected_product_item_p" style={{ textDecoration: 'line-through' }}>
                                        {product.price}$
                                    </p>
                                    <p className="selected_product_item_discount_p">
                                        {calculateDiscountedPrice(product.price, product.discountPercentage).toFixed(2)}$
                                    </p>
                                </>
                            ) : (
                                <p className="selected_product_item_p">{product.price}$</p>
                            )}
                        </div>
                        <div className="selected_product_button_container">
                            <MyButton
                                style={{ width: "95%", height: "45px" }}
                                onClick={() => handleAddToCart(product)}
                            >
                                Добавить в корзину
                            </MyButton>
                        </div>
                    </div>
                </div>

                <h3 className="selected_product_reviews_list_main">Отзывы: </h3>
                <ul className="selected_product_reviews_list">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <li key={index} className="selected_product_reviews__list_item">
                                <div className="selected_product_reviews_list_item_container">
                                    <div className="selected_product_reviews_list_item_text">
                                        <div className="selected_product_reviews_list_item_text_container">
                                            <div className="selected_product_reviews_list_item_p">
                                                <p className="selected_product_reviews_list_item_name">{review.reviewerName}</p>
                                                <p className="selected_product_reviews_list_item_email">{review.reviewerEmail}</p>
                                            </div>
                                            <div className="selected_product_reviews_list_rating_container">
                                                <StarRating rating={review.rating} />
                                            </div>
                                        </div>
                                        <h1 className="selected_product_reviews_list_item_comment">{review.comment}</h1>
                                        <p className="selected_product_reviews_list_item_date">
                                            {formatDate(review.date)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Нет отзывов на этот продукт</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SelectedProduct;
