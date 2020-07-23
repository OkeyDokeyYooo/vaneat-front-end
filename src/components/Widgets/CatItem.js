import React from 'react';
import {Link} from 'react-router-dom'

import '../Widgets/Widgets.css'

const CatItem = (props) =>{
    return(
        <div className='catclass'>
            <Link to={`/category/${props.title}`}>
                <img src={props.img} alt={props.title}/>
                <span id="tittle">{props.title}</span>
            </Link>
        </div>
    )
}

export default CatItem