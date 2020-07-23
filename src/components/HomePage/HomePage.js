import React from 'react'
import { Link, Switch, Route, } from 'react-router-dom'

// icons
import {FaRegUserCircle} from 'react-icons/fa'

// components
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

import './HomePage.css'


const HomePage = (props) => {

    return (
        <div className="home-page">
            <header >
                <Link id="home-page-header-logo" to="/">
                    <span>LOGO</span>
                </Link>
                <Link id="home-page-header-log-in" to="/login">
                    <span id="svg-container"><FaRegUserCircle/></span>
                    <span>LOG IN</span>
                </Link>    
            </header>
            <main>
                <div id="home-body">
                    <h3>One Thousand Flavours In One Place</h3>
                    <Link to="/restaurants"><button>LET'S GO EXPLORE</button></Link>
                </div>
            </main>
            <footer>Footer</footer>
            <Switch>
                <Route exact path='/login' component={LoginWindow}/>
                <Route exact path='/signup' component={SignupWindow}/>
            </Switch>
        </div>
    )
}

export default HomePage;