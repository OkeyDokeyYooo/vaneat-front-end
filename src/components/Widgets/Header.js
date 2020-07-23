import React from 'react'
import {Link} from 'react-router-dom'

// icons
import {FaRegUserCircle} from 'react-icons/fa'

import './Widgets.css'

const Header = () => {
    return (
        <header id="restaurant-header">
            <Link id="restaurant-header-logo" to="/">
                    <span>LOGO</span>
            </Link>
            <Link id="restaurant-header-log-in" to="/login">
                <span id="svg-container"><FaRegUserCircle/></span>
                <span>LOG IN</span>
            </Link>   
        </header>
    )
}

export default Header