import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';

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
            <div id="restaurant-main-page-body">
                <div className="body-header">Cuisines & Categories</div>
                <Slider />
                <div className="body-header">Popular Restaurants</div>
                <RestList />
            </div>
            <Switch>
                <Route path='/restaurants/login' component={LoginWindow}/>
                <Route path='/restaurants/signup' component={SignupWindow}/>
            </Switch>
        </div>
    )
}

export default MainPage;