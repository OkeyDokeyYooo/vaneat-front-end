import React from 'react';


const RestList = (props) =>{
    return(
        <div className='restlist'>
            <h2>{props.name}</h2>
            <h3>{props.location}</h3>
            <h4>{props.telephone}</h4>
            <h5>{props.rate}</h5>
        </div>
    )
}




export default RestList