import React from 'react';

import '../Widgets/Widgets.css'

const CatItem = (props) =>{

    const imageStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) ), url(${props.img})`
    }

    return(
        <div className='catclass'>
            <img style={imageStyle} alt=""/>
            <span id="tittle">{props.title}</span>
        </div>
    )
}

export default CatItem