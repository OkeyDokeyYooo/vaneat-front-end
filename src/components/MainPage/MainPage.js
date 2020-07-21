import React from 'react'
import { Link, Switch, Route, } from 'react-router-dom'

// icons
import {FaRegUserCircle} from 'react-icons/fa'

// components
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

import './MainPage.css'

const MainPage = (props) => {

    return (
        <div className="main-page">
            <header >
                <Link id="main-page-header-log-in" to="/login">
                    <span id="svg-container"><FaRegUserCircle/></span>
                    <span>LOG IN</span>
                </Link>    
            </header>
            <main>
                <Link to="/restaurants">All restaurants</Link>
            </main>
            <footer>Footer</footer>
            <Switch>
                <Route exact path='/login' component={LoginWindow}/>
                <Route exact path='/signup' component={SignupWindow}/>
            </Switch>
        </div>
    )
}

export default MainPage;