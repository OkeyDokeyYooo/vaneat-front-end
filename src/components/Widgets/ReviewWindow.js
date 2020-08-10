import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ImageUploader from 'react-images-upload';
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios';
import { useSelector } from 'react-redux'

// icon
import { BsX } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md"

const labels = {
    0: '',
    1: 'Horrible',
    2: 'Bad',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
}

const dollors = {
    0: '',  
    1: '$0  ~ $10',
    2: '$10 ~ $20',
    3: '$20 ~ $40',
    4: '$40 ~ $80',
    5: '> $80'
}

const useStyles = makeStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    }, 
    dollar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        "& > *": {
            color: "black"
        }
    }
});

const StarRating = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={props.rate}
                size="large"
                onChange={(event, newValue) => {
                    props.setRate(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    props.setHover(newHover);
                }}
            />
            {props.rate !== null && <Box ml={2}>{labels[props.hover !== -1 ? props.hover : props.rate]}</Box>}
        </div>
    );
}

const DollarRating = props => {
    const classes = useStyles();

    return (
        <div className={classes.dollar}>
            <Rating
                name="money-hover"
                value={props.dollar}
                size="large"
                onChange={(event, newValue) => {
                    if (newValue === null) {
                        newValue = 0
                    }
                    props.setDollar(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    props.setHoverDollar(newHover);
                }}
                icon={<MdAttachMoney fontSize="inherit" />}
            />
            {props.dollar !== null && <Box ml={2}>{dollors[props.hoverDollar !== -1 ? props.hoverDollar : props.dollar]}</Box>}
        </div>
    );
}

const ReviewWindow = props => {

    const [rate, setRate] = useState(0)
    const [dollar, setDollar] = useState(0)
    const [hover, setHover] = useState(-1)
    const [hoverDollar, setHoverDollar] = useState(-1)
    const [uploadPic, setUploadPic] = useState([])
    const [favoriteDish, setFavoriteDish] = useState([])
    const [review, setReview] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const user = useSelector(state => state.user)

    // adding dishes and remove dishes
    const handleDishes = (e) => {
        let dish = e.target.value
        let lst = favoriteDish
        let index = lst.indexOf(dish)
        if (index > -1) {
            lst.splice(index, 1)
        } else {
            lst.push(dish)
        }
        setFavoriteDish(lst)
    }

    const validateInput = () => {
        if (review === '' || review.length < 10) {
            setErrorMsg('The review can not be less than 10 words')
            return false
        }
        return true
    }

    const handleSubmit = () => {
        console.log(dollar)
        const isValid = validateInput()
        if (isValid) {
            const data = new FormData()

            for (const file of uploadPic) {
                data.append('files[]', file, file.name);
            }
            data.set('id', user.id)
            data.set('username', user.username)
            data.set('review', review)
            data.set('rate', rate)
            data.set('dollar', dollar)
            data.set('favoriteDish', favoriteDish)
            data.set('restaurantId', props.restaurantId)

            axios.post(
                'http://localhost:8080/api/review',
                data, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${user.token}`
                    }
                }).then(res => {
                    // if success
                    props.setShowPopUp(false)
                    window.location.reload()
                }).catch(err => {
                console.log(err)
            })
        } 
    }


    return (
        <div className="pop-up-window-background">
            <OutsideClickHandler onOutsideClick={() => props.setShowPopUp(false)}>
            <div id="review-pop-up-window">
                <section id="review-pop-up-window-header">
                    <BsX style={{float: 'right', color: "rgba(0, 0, 0, 0.54)", fontSize: "1em"}} onClick={() => props.setShowPopUp(false)}/>
                    Write a Review
                </section>
                <section id="review-pop-up-window-rate-section">
                    <div>Tap to rate your experience</div>
                    <StarRating rate={rate} setRate={setRate} hover={hover} setHover={setHover}/>
                </section>
                <section>
                    <div>Tap to rate your cost</div>
                    <DollarRating dollar={dollar} setDollar={setDollar} hoverDollar={hoverDollar} setHoverDollar={setHoverDollar}/>
                </section>
                <section id="review-pop-up-window-comment-sections">
                    <div>Write you Review</div>
                    <textarea placeholder="Write your review" value={review} required onChange={e => setReview(e.target.value)}/>
                    {errorMsg !== '' ? <p>{errorMsg}</p> : <p></p>}
                </section>
                <section id="review-pop-up-window-favorite-dishes-section">
                    <div>Favorite Dishes</div>
                    <ul className="favorite-dishes-ul">
                        {
                            props.dishes &&
                            props.dishes.map(dish => {
                                return (
                                    <li key={dish.tittle}>
                                        <input 
                                            type="checkbox" 
                                            id={dish.tittle}
                                            value={dish.tittle}
                                            onChange={handleDishes}
                                        />
                                        <label htmlFor={dish.tittle}> {dish.tittle} </label>
                                    </li>
                                )   
                            })
                        }
                    </ul>
                </section>
                <section>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={(pic) => {setUploadPic(prevState => prevState.concat(pic))}}
                        imgExtension={['.jpg', '.png']}
                        label={"Max file size: 5mb, accepted: jpg | png"}
                        maxFileSize={5242880}
                        withPreview
                    />
                </section>
                <section>
                    <button id="add-review-btn" onClick={() => handleSubmit()}>Add Review</button>
                </section>
            </div>
            </OutsideClickHandler>
        </div>
    )
}

export default ReviewWindow