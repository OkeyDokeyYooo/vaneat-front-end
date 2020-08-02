import React, {useEffect, useState}from 'react'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

import fakeReview from '../../fakeReview.json'
import { Link } from 'react-router-dom';

const ReviewSection = props => {

    return (
        <section className="profile-page-main-body">
            <div className="profile-page-review-section">
                <div className="profile-page-main-body-title">Reviews</div>
                <div className="profile-page-review-container">
                    {
                        fakeReview.map(review => {
                            let restaurant = review.restaurant

                            const StyledRating = withStyles({
                                iconFilled: {
                                  color: () => {
                                      if (restaurant.rate > 4.75) return "#EA120E"
                                      else if (restaurant.rate <= 4.75 || restaurant.rate > 4.5) return "#F64922"
                                      else return "#F99F21"
                                  }
                                },
                            })(Rating);

                            return (
                                <div className="profile-page-review" key={restaurant.name}>
                                    <div className="profile-page-review-restaurant-section">
                                        <img src={restaurant.image} alt={restaurant.name}/>
                                        <div className="review-restaurant-detail-container">
                                            <Link id="title" to={`/restaurants/${restaurant.name}`}>{restaurant.name}</Link>
                                            <div className="dollar-cat-container">
                                                <span id="dollar">{'$'.repeat(restaurant.dollar)}</span>
                                                <div className="vl"></div>
                                                <span id="cat">{restaurant.category}</span>
                                            </div>
                                            <div id="location">{restaurant.location}</div>
                                        </div>
                                        <div id="rate">
                                            <StyledRating 
                                                value={Number(restaurant.rate)} 
                                                readOnly 
                                                precision={0.5}
                                                size="medium"    
                                            />
                                            <span>{review.date}</span>
                                        </div>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default ReviewSection