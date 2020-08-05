import React, {useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
    StaticGoogleMap,
    Marker,
} from 'react-static-google-map';
import { useSelector } from 'react-redux';

// components
import ReviewItem from '../Widgets/ReviewItem'
import DishesSlider from '../Widgets/DishesSlider'
import ReviewWindow from '../Widgets/ReviewWindow'
import AlertWindow from '../Widgets/AlertWindow'

// icon
import { MdRateReview, MdDirections } from 'react-icons/md'
import { BsBookmarkPlus } from 'react-icons/bs'
import { FaShare } from 'react-icons/fa'
import { MdContentCopy, MdWarning} from 'react-icons/all'

// need to get the detail information from backend 
import fakeRest from '../../fakeRest.json'


const DetailRestaurantPage = (props) => {
    const name = props.match.params.restaurantName

    const user = useSelector(state => state.user)
    const [restInfo, setRestInfo] = useState(null)
    const [rateColor, setRateColor] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)
    const [showAlert, setShowAlert] = useState({
        show: false,
        text: "Restaurant URL Copied to Clipboard",
        icon: <MdContentCopy />,
        backgroundColor: '#d2f8dc',
        color: '#4B9B42'
    })

    const StyledRating = withStyles({
        iconFilled: {
          color: () => {
              if (restInfo.rate > 4.75) return "#EA120E"
              else if (restInfo.rate <= 4.75 || restInfo.rate > 4.5) return "#F64922"
              else return "#F99F21"
          }
        },
    })(Rating);

    const alertWindowTimeOut = () => {
        setTimeout(() => {
            setShowAlert(prevState => {
                return {
                    ...prevState,
                    show: false
                }
            })
        }, 4000)
    }

    const handleAddReview = () => {
        if (user.isLogIn) {
            setShowPopUp(true)
        } else {
            setShowAlert({
                show: true,
                text: "Please Login First",
                icon: <MdWarning />,
                backgroundColor: '#f4c2c2',
                color: '#ff726f'  
            })
            alertWindowTimeOut()
        }
    }

    // when this component mount to the DOM = componentDidMount
    useEffect(() => {
        let restData = fakeRest.find(rest => rest.name === name)
        setRestInfo(restData)

        document.title = restData.name

        if (restData.rate > 4.75){
            setRateColor("excellent")
        } else if (restData.rate <= 4.75 || restData.rate > 4.5) {
            setRateColor("good")
        } else {
            setRateColor("ok")
        }
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
                    <div className="detail-restaurant-page-banner-wrapper">
                        <img src={restInfo.banner} alt="../../img/food-banner.jpg"/>
                    </div>
                    <div className="detail-restaurant-page-main-wrapper">
                        <section className="detail-restaurant-page-main-info">
                            <h1>{restInfo.name}</h1>
                            <div id="detail-page-rating-wrapper">
                                <StyledRating 
                                    value={Number(restInfo.rate)} 
                                    readOnly 
                                    precision={0.5}
                                    size="large"    
                                />
                                <span className={`detail-restaurant-rate-txt ${rateColor}`}>{restInfo.rate}</span>
                                <span id="detail-restaurant-num-rate">{restInfo.reviews.length} reviews</span>
                            </div>
                            <div id="detail-page-btn-section">
                                <button id="add-review-btn" onClick={() => handleAddReview()}>
                                    <MdRateReview />
                                    <span>Add Review</span>
                                </button>
                                <button>
                                    <a href={`http://maps.google.com/?q=${restInfo.location}`} target="_blank" el="noopener noreferrer">
                                        <MdDirections />
                                        <span>Direction</span>
                                    </a>
                                </button>
                                <button>
                                    <BsBookmarkPlus />
                                    <span>Favorite</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href); 
                                        setShowAlert({
                                            show: true,
                                            text: "Restaurant URL Copied to Clipboard",
                                            icon: <MdContentCopy />,
                                            backgroundColor: '#d2f8dc',
                                            color: '#4B9B42'    
                                        });
                                        alertWindowTimeOut()
                                    }}>
                                    <FaShare />
                                    <span>Share</span>
                                </button>
                            </div>
                        </section>
                        <hr/>
                        <section >
                            <h3>Location & Hours</h3>
                            <div className="detail-restaurant-location-hour-section">
                                <a className="google-map-container" href={`http://maps.google.com/?q=${restInfo.location}`} target="_blank" el="noopener noreferrer">
                                    <StaticGoogleMap size="315x150" className="img-fluid" apiKey="AIzaSyBRDDEjs_ExPf0quVz7YczSZhkeQv70QdY">
                                        <Marker location={restInfo.location} color="red" />
                                    </StaticGoogleMap>
                                    <div className="google-map-address-container">
                                        {restInfo.location}
                                    </div>
                                </a>
                                <table className="hours-table">
                                    <tbody>
                                    {   
                                        Object.entries(restInfo.hours).map(([key, val]) => {
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
                            </div>
                        </section>
                        <hr />
                        <section className="detail-restaurant-page-dishes-section">
                            <h3>Popular Dishes</h3>
                            <DishesSlider dishes= {restInfo.dishes}/>
                        </section>
                        <hr />
                        <section className="detail-restaurant-page-reviews-section">
                            <h3>Reviews({restInfo.reviews.length})</h3>
                            {
                                restInfo.reviews.map((review, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ReviewItem 
                                                key={index} 
                                                author={review.author}
                                                rate={review.rate}
                                                review={review.review}
                                                date={review.date}
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
                <ReviewWindow dishes={restInfo.dishes} setShowPopUp={setShowPopUp}/>
            }
            {
                showAlert.show &&
                <AlertWindow icon={showAlert.icon} text={showAlert.text} showAlert={showAlert} backgroundColor={showAlert.backgroundColor} color={showAlert.color}/>
            }
        </div>
    )
}

export default DetailRestaurantPage
