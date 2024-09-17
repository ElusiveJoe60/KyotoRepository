import React from "react";
import ratingIcon from "../images/ratingIcon.svg";
import emptyRatingIcon from "../images/emptyRatingIcon.svg";

const StarRating = ({ rating, maxRating = 5 }) => {
    const filledStars = Math.min(Math.floor(rating), maxRating);
    const emptyStars = maxRating - filledStars;

    return (
        <div className="star_rating_container">
            {Array.from({ length: filledStars }).map((_, index) => (
                <img key={index} src={ratingIcon} alt="Рейтинг" className="star_icon" />
            ))}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <img key={index} src={emptyRatingIcon} alt="Пустая звезда" className="star_icon" />
            ))}
        </div>
    );
};

export default StarRating;
