import React from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';

// component
import Slider from '../Widgets/Sliders'
import Header from '../Widgets/Header'
import LoginWindow from "../Widgets/LoginWindow"
import SignupWindow from "../Widgets/SignupWindow"
import RestList from '../Widgets/RestList'
import DetailRestaurant from './DetailRestaurantPage'

import './MainPage.css'


const RestaurantMainPage = () => {
    return (
        <div id="restaurant-main-page-body">
            <div className="body-header">Cuisines & Categories</div>
            <Slider />
            <div className="body-header">Popular Restaurants</div>
            <RestList />
        </div>
    )
}


const MainPage = () => {

    const match = useRouteMatch()

    return (
        <div id="restaurant-main-page">
            <Header />
            <Switch>
                <Route path={`${match.path}/:restaurantName`} component={DetailRestaurant}/>
                <Route exact path={`${match.path}`} component={RestaurantMainPage}/>
            </Switch>
        </div>
    )
}

export default MainPage;