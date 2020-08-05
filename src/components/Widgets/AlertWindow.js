import React from 'react'

import './Widgets.css'

// // icon
// import { MdContentCopy } from 'react-icons/all'

const AlertWindow = props => {
    return (
        <div className='alert-window-wrapper' style={{backgroundColor: props.backgroundColor, color: props.color}}>
            {props.icon}
            {props.text}
        </div>
    )
}

export default AlertWindow