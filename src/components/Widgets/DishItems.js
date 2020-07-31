import React from 'react';

import '../Widgets/Widgets.css'

const DishItems = (props) =>{

    const imageStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) ), url(${props.img})`,
        height: 200 ,
        width: 200
    }

    return(
        <div className='dishclass'>
            <img style={imageStyle} alt=""/>
            <span >{props.title}</span>
        </div>
    )
}

export default DishItems