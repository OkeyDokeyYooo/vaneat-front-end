import React, {useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
    StaticGoogleMap,
    Marker,
} from 'react-static-google-map';
import { useSelector, useDispatch} from 'react-redux';
import { useAlert } from 'react-alert'
import { addFavorite, removeFavorite} from '../../actions/userAction'
import {Helmet} from "react-helmet";

// components
import ReviewItem from '../Widgets/ReviewItem'
import DishesSlider from '../Widgets/DishesSlider'
import ReviewWindow from '../Widgets/ReviewWindow'
// import AlertWindow from '../Widgets/AlertWindow'

// icon
import { MdRateReview, MdDirections, IoMdHeartDislike, IoMdHeart, FaShare} from 'react-icons/all'
// import { MdContentCopy, MdWarning} from 'react-icons/all'

// need to get the detail information from backend 
import Axios from 'axios';
import API from '../../API';


const DetailRestaurantPage = (props) => {    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const alert = useAlert()
    const [restInfo, setRestInfo] = useState(null)
    // const [rateColor, setRateColor] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)
    // const [showAlert, setShowAlert] = useState({
    //     show: false,
    //     text: "Restaurant URL Copied to Clipboard",
    //     icon: <MdContentCopy />,
    //     backgroundColor: '#d2f8dc',
    //     color: '#4B9B42'
    // })

    const StyledRating = withStyles({
        iconFilled: {
          color: () => {
              if (restInfo.rate > 4.75) return "#EA120E"
              else if (restInfo.rate <= 4.75 || restInfo.rate > 4.5) return "#F64922"
              else return "#F99F21"
          }
        },
    })(Rating);

    // const alertWindowTimeOut = () => {
    //     setTimeout(() => {
    //         setShowAlert(prevState => {
    //             return {
    //                 ...prevState,
    //                 show: false
    //             }
    //         })
    //     }, 4000)
    // }

    const handleAddReview = () => {
        if (user.isLogIn) {
            setShowPopUp(true)
        } else {
            alert.info("Please Login First")
            // setShowAlert({
            //     show: true,
            //     text: "Please Login First",
            //     icon: <MdWarning />,
            //     backgroundColor: '#f4c2c2',
            //     color: '#ff726f'  
            // })
            // alertWindowTimeOut()
        }
    }

    const handleFavorite = () => {
        if (!user.isLogIn) {
            alert.info("Please Login First")
        } else {
            Axios.post(API.addFavorite, {
                restaurantId: props.match.params.restaurantId,
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => {
                if (res.status === 200){
                    dispatch(addFavorite(restInfo.rest._id))
                    alert.success('Favorite Added')
                } else {
                    alert.error('Favorite added failed')
                }
            }).catch(err => {
                alert.error(`Error Code: ${err.response}`)
            })
        }
    } 

    const handleUnFavorite = () => {
        if (!user.isLogIn) {
            alert.info("Please Login First")
        } else {
            Axios.post(API.removeFavorite, {
                restaurantId: props.match.params.restaurantId,
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(res => {
                if (res.status === 200){
                    dispatch(removeFavorite(restInfo.rest._id))
                    alert.success('Favorite removed')
                } else {
                    alert.error('Failed to remove')
                }
            })
        }
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert.success("Restaurant URL Copied to Clipboard") 
        // setShowAlert({
        //     show: true,
        //     text: "Restaurant URL Copied to Clipboard",
        //     icon: <MdContentCopy />,
        //     backgroundColor: '#d2f8dc',
        //     color: '#4B9B42'    
        // });
        // alertWindowTimeOut()
    }

    // when this component mount to the DOM = componentDidMount
    useEffect(() => {
        // let restData = fakeRest.find(rest => rest.name === name)
        const id = props.match.params.restaurantId
    
        Axios
        .get(API.detailRestaurant + id)
        .then(res => {
            if (res.status === 200){
                let restData = res.data.restaurant
                // console.log(restData)
                setRestInfo(restData)

                // if (restData.rest.rate > 4.75){
                //     setRateColor("excellent")
                // } else if (restData.rest.rate <= 4.75 || restData.rest.rate > 4.5) {
                //     setRateColor("good")
                // } else {
                //     setRateColor("ok")
                // }      
            }
        })
    }, [])

    // make background not scrolling
    useEffect(() => {
        showPopUp && (document.body.style.overflow = 'hidden')
        !showPopUp && (document.body.style.overflow = 'unset')
    }, [showPopUp ]);


    return (
        <div className="detail-restaurant-page-wrapper">
            {
                restInfo &&
                <React.Fragment>
                    <Helmet>
                        <title>{restInfo.rest.name}</title>
                    </Helmet>
                    <div className="detail-restaurant-page-banner-wrapper">
                        <img src={restInfo.rest.banner} alt="../../img/food-banner.jpg"/>
                    </div>
                    <div className="detail-restaurant-page-main-wrapper">
                        <section className="detail-restaurant-page-main-info">
                            <h1>{restInfo.rest.name}</h1>
                            <div id="detail-page-rating-wrapper">
                                <StyledRating 
                                    value={Number(restInfo.rest.rate)} 
                                    readOnly 
                                    precision={0.5}
                                    size="large"    
                                />
                                <span className={`detail-restaurant-rate-txt`}>
                                    {
                                        restInfo.rest.rate > 0 &&
                                        restInfo.rest.rate.toFixed(1)
                                    }
                                </span>
                                <span id="detail-restaurant-num-rate">{restInfo.reviews.length} reviews</span>
                                <span id="middle-dot">&middot;</span>
                                <span id="number-of-dollar">
                                    {   
                                        '$'.repeat(restInfo.rest.average_price)
                                    }
                                </span>
                            </div>
                            <div id="detail-page-btn-section">
                                <button id="add-review-btn" onClick={() => handleAddReview()}>
                                    <MdRateReview />
                                    <span>Add Review</span>
                                </button>
                                <button>
                                    <a href={`http://maps.google.com/?q=${restInfo.rest.address}`} target="_blank" el="noopener noreferrer">
                                        <MdDirections />
                                        <span>Direction</span>
                                    </a>
                                </button>
                                {
                                    !user.favorites.includes(restInfo.rest._id) ?
                                    <button onClick={handleFavorite}>
                                        <IoMdHeart />
                                        <span>Like</span>
                                    </button> :
                                    <button onClick={handleUnFavorite} id="unlike-btn">
                                        <IoMdHeartDislike />
                                        Dislike
                                    </button>
                                }
                                <button 
                                    onClick={handleShare}>
                                    <FaShare />
                                    <span>Share</span>
                                </button>
                            </div>
                        </section>
                        <hr/>
                        <section >
                            <h3>Location & Hours</h3>
                            <div className="detail-restaurant-location-hour-section">
                                <a className="google-map-container" href={`http://maps.google.com/?q=${restInfo.rest.address}`} target="_blank" el="noopener noreferrer">
                                    <StaticGoogleMap size="315x150" className="img-fluid" apiKey="AIzaSyBRDDEjs_ExPf0quVz7YczSZhkeQv70QdY">
                                        <Marker location={restInfo.rest.address} color="red" />
                                    </StaticGoogleMap>
                                    <div className="google-map-address-container">
                                        {restInfo.rest.address}
                                    </div>
                                </a>
                                {
                                    restInfo.rest.hours && 
                                    <table className="hours-table">
                                        <tbody>
                                        {   
                                            Object.entries(restInfo.rest.hours).map(([key, val]) => {
                                                let currDay = moment().format('ddd')
                                                let showOpening = false
                                                let isOpening = false
                                                // check if opening
                                                if (currDay === key) {
                                                    showOpening = true
                                                    let timeArr = val.split(" - ")
                                                    let startTime = moment(timeArr[0], "h:mm a")
                                                    let endTime = moment(timeArr[1], "h:mm a")
                                                    if (moment().isBetween(startTime, endTime)) {
                                                        isOpening = true
                                                    }
                                                }
                                                return (
                                                    <tr key={key}>
                                                        <th className="hours-table-col1">{key}</th>
                                                        <th className="hours-table-col2">{val}</th> 
                                                        <th className="hours-table-col3">{showOpening ? isOpening ? "Opening now" : "Closed now" : ""}</th>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                }      
                            </div>
                        </section>
                        <hr />
                        <section className="detail-restaurant-page-dishes-section">
                            <h3>Popular Dishes</h3>
                            <DishesSlider dishes= {restInfo.rest.dishes}/>
                        </section>
                        <hr />
                        <section className="detail-restaurant-page-reviews-section">
                            <h3>Reviews</h3>
                            {   
                                restInfo.reviews &&
                                restInfo.reviews.map((review, i) => {
                                    return (
                                        <React.Fragment key={review.createdAt}>
                                            <ReviewItem 
                                                key={i}
                                                author={review.username}
                                                rate={review.rate}
                                                review={review.review}
                                                images={review.image}
                                                date={moment(review.createdAt).format('lll')}
                                            />
                                            <hr />
                                        </React.Fragment>
                                    )
                                })
                            }
                        </section>
                    </div>
                </React.Fragment>
            }
            {
                showPopUp && restInfo &&
                <ReviewWindow dishes={restInfo.rest.dishes} setShowPopUp={setShowPopUp} restaurantId={restInfo.rest._id}/>
            }
            {/* {
                showAlert.show &&
                <AlertWindow icon={showAlert.icon} text={showAlert.text} showAlert={showAlert} backgroundColor={showAlert.backgroundColor} color={showAlert.color}/>
            } */}
        </div>
    )
}

export default DetailRestaurantPage
