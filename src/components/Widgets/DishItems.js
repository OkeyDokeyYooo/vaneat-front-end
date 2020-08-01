import React from 'react';

import '../Widgets/Widgets.css'

const DishItems = (props) =>{

    const imageStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) ), url(${props.img})`,
        // height: 140 ,
        // width: 220
    }

    return(
        <div className='dishclass'>
            <img style={imageStyle} alt=""/>
            <div>
                <span >{props.title}</span>
            </div>
        </div>
    )
}

export default DishItems