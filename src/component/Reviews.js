import React, { useEffect, useState } from 'react'

const Reviews = ({ detailReviews }) => {

    const [reviewsData, setReviewsData] = useState([]);
    useEffect(() => {
        setReviewsData(detailReviews.results)
    }, [])
    // console.log(reviewsData);

    return (
        <div className='showing-reviews'>
            {
                reviewsData ?
                    reviewsData.map((review, idx) => {
                        return (
                            <div className='product-commnets' key={idx}>
                                <h3>{review.author}</h3>
                                <p>{review.content}</p>
                            </div>
                        )
                    }) :
                    null
            }
        </div>
    )
}

export default Reviews