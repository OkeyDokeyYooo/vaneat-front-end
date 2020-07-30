import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'


// icons
import {FaRegUserCircle} from 'react-icons/fa'

// components
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

import './HomePage.css'


const HomePage = (props) => {

    const user = useSelector(state => state.user)
    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    return (
        <div className="home-page">
            <header >
                <Link id="home-page-header-logo" to="/">
                    <span>LOGO</span>
                </Link>
                {
                    user.isLogIn ? 
                    <div id="home-page-header-log-in">
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>{user.username}</span>
                    </div> :
                    <div id="home-page-header-log-in" onClick={() => setShowLogin(true)}>
                        <span id="svg-container"><FaRegUserCircle/></span>
                        <span>LOG IN</span>
                    </div> 
                }
            </header>
            <main>
                <div id="home-body">
                    <h3>One Thousand Flavours In One Place</h3>
                    <Link to="/restaurants"><button>LET'S GO EXPLORE</button></Link>
                </div>
            </main>
            {
                showLogin &&
                <LoginWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup}/>
            }
            {
                showSignup &&
                <SignupWindow setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
            }
            {/* <footer>Footer</footer> */}
        </div>
    )
}

export default HomePage