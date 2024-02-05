import React from 'react';

const Reviews = ({ detailReviews }) => {
  return (
    <div className="showing-reviews">
      {detailReviews.results &&
        detailReviews.results.map((review, idx) => (
          <div className="product-commnets" key={idx}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
