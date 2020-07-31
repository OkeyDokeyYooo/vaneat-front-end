import React, {useEffect, useState, useCallback, memo} from 'react'
import Rating from '@material-ui/lab/Rating';
import { useLocation } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// components
import ReviewItem from '../Widgets/ReviewItem'
import DishesSlider from '../Widgets/DishesSlider'
import ReviewWindow from '../Widgets/ReviewWindow'


// need to get the detail information from backend 
import fakeRest from '../../fakeRest.json'

// const containerStyle = {
//     width: '400px',
//     height: '400px'
// };
   
// const center = {
//     lat: -3.745,
//     lng: -38.523
// };


const DetailRestaurantPage = (props) => {
    const location = useLocation()
    const name = location.state.name

    const [restInfo, setRestInfo] = useState(null)
    const [rateColor, setRateColor] = useState(null)
    const [showPopUp, setShowPopUp] = useState(true)


    // const [map, setMap] = useState(null)

    // const onLoad = useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map)
    // }, [])

    // const onUnmount = useCallback(function callback(map) {
    //     setMap(null)
    // }, [])

    const StyledRating = withStyles({
        iconFilled: {
          color: () => {
              if (restInfo.rate > 4.75) return "#EA120E"
              else if (restInfo.rate <= 4.75 || restInfo.rate > 4.5) return "#F64922"
              else return "#F99F21"
          }
        },
    })(Rating);

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
                        </section>
                        <hr/>
                        <section>
                            <h3>Location & Hours</h3>
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
                                        <React.Fragment>
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
        </div>
    )
}

export default memo(DetailRestaurantPage)
