import React from 'react';
import '../Widgets/Widgets.css'
import RestItems from './RestList';

const RestItem = (props) =>{
    return(
        <div className='restlist'>
            <img src={props.img} alt={props.name}/>
            <div id='rest-name'>{props.name}</div>
            <div className='vl'></div>
            <div className='contacts'>
                
                <div id='rest-location'>{props.location}</div>
                <div id='rest-tele'>{props.tel}</div>
            </div>
            
            <div id='rest-rate'>{props.rate}</div>
        </div>
    )
}

export default RestItem