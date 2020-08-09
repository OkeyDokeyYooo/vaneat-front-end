import React, {useEffect, useState}from 'react'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import API from '../../API'
import moment from 'moment'

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestaurantSection = props => {
    
    const [restaurant, setRestaurant] = useState('')

    useEffect(() => {
        axios.get(API.detailRestaurant + props.review.restaurantId)
        .then(res => {
            setRestaurant(res.data.restaurant.rest)
        })
    }, [])

                                
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
        <React.Fragment>
            <img src={restaurant.image} alt={restaurant.name}/>
            <div className="review-restaurant-detail-container">
                <Link id="title" to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
                <div className="dollar-cat-container">
                    <span id="dollar">{'$'.repeat(restaurant.average_price)}</span>
                    <div className="vl"></div>
                    <span id="cat">{restaurant.category}</span>
                </div>
                <div id="location">{restaurant.address}</div>
            </div>
            <div id="rate">
                <StyledRating 
                    value={Number(props.review.rate)} 
                    readOnly 
                    precision={0.5}
                    size="medium"    
                />
                <span id="rate-time">{moment(props.review.createAt).format('lll')}</span>
            </div>
            <p>{props.review.review}</p>
            <div className="review-item-image-section">
            {
                props.review.image.map((img, index) => {
                    return (
                        <div className="review-item-image-wrapper" key={index}>
                            <img src={img} alt={`${index}`}/>
                        </div>
                    )
                })
            }
            </div>
        </React.Fragment>
    )
}

const ReviewSection = props => {

    const [reviews, setReviews] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        let mounted = true

        axios.get(API.userReviews, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => {
            if (res.status === 200) {
                if (mounted) {
                    setReviews(res.data.review)
                }
            }
        })
        return () => {
            mounted = false
        }
    }, [])

    return (
        <section className="profile-page-main-body">
            <div className="profile-page-review-section">
                <div className="profile-page-main-body-title">Reviews</div>
                <div className="profile-page-review-container">
                    {
                        reviews && 
                        reviews.map((review, index) => {
                            return (
                                <div className="profile-page-review" key={index}>
                                    <div className="profile-page-review-restaurant-section">
                                        <RestaurantSection review={review}/>
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