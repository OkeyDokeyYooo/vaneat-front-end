import React from 'react';
import { useDispatch } from 'react-redux'
import { handleCategory } from '../../actions/categoryAction'

import '../Widgets/Widgets.css'

const CatItem = (props) =>{

    const dispatch = useDispatch()

    const imageStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) ), url(${props.img})`
    }

    return(
        <div className='catclass' onClick={() => dispatch(handleCategory(props.title))}>
            <img style={imageStyle} alt=""/>
            <span id="tittle">{props.title}</span>
        </div>
    )
}

export default CatItem