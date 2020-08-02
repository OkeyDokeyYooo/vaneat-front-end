import React from 'react'

import errorImg from '../../img/404.png'
import './Error.css'

const Error = props => {
    return (
        <div className="error-page-wrapper">
            <img src={errorImg} alt="404"/>
            <div className="error-page-text">
                <p>
                    OPPS... <br />
                    You need to Log In to See this Page
                </p>
            </div>
        </div>
    )
}

export default Error