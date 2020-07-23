import React from 'react';
import {Switch, Route} from 'react-router-dom';

// component
import Slider from '../Widgets/Sliders'
import Header from '../Widgets/Header'
import LoginWindow from "../Widgets/LoginWindow"
import SignupWindow from "../Widgets/SignupWindow"
import RestList from '../Widgets/RestList'

import './MainPage.css'

const MainPage = () => {
    return (
        <div id="restaurant-main-page">
            <Header />
            <Slider />
            <RestList />
            <Switch>
                <Route path='/restaurants/login' component={LoginWindow}/>
                <Route path='/restaurants/signup' component={SignupWindow}/>
            </Switch>
        </div>
    )
}

export default MainPage;