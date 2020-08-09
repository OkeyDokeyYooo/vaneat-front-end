import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

const ReviewItem = props => {

    const StyledRating = withStyles({
        iconFilled: {
          color: () => {
              if (props.rate > 4.75) return "#EA120E"
              else if (props.rate <= 4.75 || props.rate > 4.5) return "#F64922"
              else return "#F99F21"
          }
        },
    })(Rating);


    return (
        <div className="review-item-wrapper">
            <div className="review-item-avatar-section">
                <img src={require("../../img/avatar.webp")} alt="avatar"/>
            </div>
            <div className="review-item-main-section">
                <div>{props.author}</div>
                <div id="review-item-rate">
                    <StyledRating 
                        value={Number(props.rate)} 
                        readOnly 
                        precision={0.5}
                        size="small"    
                    />
                    <span id="review-item-date">{props.date}</span>
                </div>
                <p className="review-item-comment">
                    {props.review}
                </p>
                <div className="review-item-image-section">
                    {
                        props.images.map((image, index) => {
                            return (
                                <div className="review-item-image-wrapper">
                                    <img src={image} alt={`${index}`}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewItem