import React from "react";

const getStars = (rate) => {
    let starsArray = [];
    for (let i = 0; i < rate; i++) {
        starsArray.push(<span>&#9733;</span>)
    }
    for (let i = 0; i < (5 - rate); i++) {
        starsArray.push(<span key={i} >&#9734;</span>)
    }
    return starsArray;
}

const Rating = ({ name, rate, content }) => {
    const starsArray = getStars(rate)
    return <div className="ratings__item" >
        {starsArray.map(star => star)}
        <h3>{name}</h3>
        <p>{content}</p>
    </div>;
};

const AverageRating = ({ ratings }) => {
    let totalRating = 0;
    for (let i = 0; i < ratings.length; i++) {
        totalRating += ratings[i].rate;
    }
    const average = totalRating / ratings.length;
    const averageRound = Math.ceil(average);
    const starsArray = getStars(averageRound)
    return <div className="ratings__average" >
        {starsArray.map(star => star)}
    </div>;
};

const RatingsList = ({ ratings }) => {
    return <div className="ratings" >
        <AverageRating ratings={ratings} />
        {ratings.map(rating => (
            <Rating key={rating.name} name={rating.name} rate={rating.rate} content={rating.content} />
        ))}
    </div>;
};

export { Rating, AverageRating };

export default RatingsList;
