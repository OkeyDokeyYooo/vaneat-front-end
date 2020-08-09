import React, {useEffect, useState}from 'react';
import {Switch, Route, useRouteMatch} from 'react-router-dom';
import axios from "axios"
import { useSelector, useDispatch} from 'react-redux'
import API from '../../API'
import { useAlert } from 'react-alert'
import { handleCategory } from '../../actions/categoryAction'

// component
import Slider from '../Widgets/Sliders'
import Header from '../Widgets/Header'
import RestList from '../Widgets/RestList'
import DetailRestaurant from './DetailRestaurantPage'

import './MainPage.css'


const RestaurantMainPage = () => {

    const category = useSelector(state => state.category)
    const alert = useAlert()
    // redux
    const [rest, setRest] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        if (category.name !== 'all') {
            axios.get(API.categoryRestaurant + category.name)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data.restaurant)
                    setRest(res.data.restaurant)
                } else {
                    alert.error("Can not find any restaurant")
                }
            }).catch(err => {
                alert.error("Can not find any restaurant")
            })
        } else {
            axios.get(API.allRestaurant)
            .then(res => {
                if (res.status === 200) {
                    setRest(res.data.restaurant)
                } else {
                    console.log("Error Loading All Restaurant")
                }
            })
        }

    }, [category])


    return (
        <div id="restaurant-main-page-body">
            <div className="body-header">Cuisines & Categories</div>
            <Slider />
            <div className="body-header">
                {
                    category.name === 'all' ? 
                    <div>Popular Restaurants</div> : 
                    <div>{category.name}<span className="back-to-all-span" onClick={() => dispatch(handleCategory("all"))}>Back to All</span></div>
                }
            </div>
            <RestList allRest={rest} category={category.name}/>
        </div>
    )
}


const MainPage = () => {

    const match = useRouteMatch()

    return (
        <div id="restaurant-main-page">
            <Header />
            <Switch>
                <Route path={`${match.path}/:restaurantId`} component={DetailRestaurant}/>
                <Route exact path={`${match.path}`} component={RestaurantMainPage}/>
            </Switch>
        </div>
    )
}

export default MainPage;