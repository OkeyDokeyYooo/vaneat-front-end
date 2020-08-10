/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

import '../Widgets/Widgets.css'


const RestItem = (props) =>{

    const StyledRating = withStyles({
        iconFilled: {
          color: () => {
              if (props.rate > 4.75) return "#EA120E"
              else if (props.rate <= 4.75 || props.rate > 4.5) return "#F64922"
              else return "#F99F21"
          }
        },
    })(Rating);
    
    const [rateColor, setRateColor] = useState(null)

    useEffect(() => {
        if (props.rate > 4.75){
            setRateColor("excellent")
        } else if (props.rate <= 4.75 || props.rate > 4.5) {
            setRateColor("good")
        } else {
            setRateColor("ok")
        }
    }, [])

    return(
        <div className='restaurant-item'>
            <img src={props.img} alt={props.name}/>
            <div id="restaurant-item-detail">
                <div id='rest-name'>{props.name}</div>
                <div id='restaurant-item-rate-wrapper'>
                    <StyledRating 
                        value={Number(props.rate)} 
                        readOnly 
                        precision={0.5}
                        size={"small"}    
                    />
                    <span className={`restaurant-item-rate-txt ${rateColor}`}>{props.rate.toFixed(1)}</span>
                    {/* <span id="number-of-comments">{props.numOfRate} reviews</span> */}
                    <em>|</em>
                    <span id="restaurant-item-rate-dollar">
                        {   
                            '$'.repeat(props.dollar)
                        }
                    </span>
                </div>
                <div className='restaurant-item-address-wrapper'>
                    <span>{props.type}</span>
                    <em>|</em>
                    <span id='rest-location'>{props.location}</span>
                </div>
                <div id='rest-tele'>{props.tel}</div>
            </div>

        </div>
    )
}

export default RestItem