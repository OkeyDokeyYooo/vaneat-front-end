import React from 'react'

import './Widgets.css'

// // icon
// import { MdContentCopy } from 'react-icons/all'

const AlertWindow = props => {
    return (
        <div className="alert-window-wrapper">
            {props.icon}
            {props.text}
        </div>
    )
}

export default AlertWindow