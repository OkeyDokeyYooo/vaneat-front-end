import React from 'react';

import '../Widgets/Widgets.css'

const DishItems = (props) =>{



    return(
        <div className='dishclass'>
            {
                props.img && 
                <img src={props.img} style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6) )`}} alt=""/>
            }
            <div>
                <span >{props.title}</span>
            </div>
        </div>
    )
}

export default DishItems