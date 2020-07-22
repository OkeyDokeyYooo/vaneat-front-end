import React from 'react'
import { Link, Switch, Route, } from 'react-router-dom'
import Slider from "react-slick";

// icons
import {FaRegUserCircle} from 'react-icons/fa'

// components
import LoginWindow from '../Widgets/LoginWindow'
import SignupWindow from '../Widgets/SignupWindow'

import './MainPage.css'

import cats from '../../fakeCat.json'

const CatItem = (props) => {
    return (
        <div>
            {/* <img src={props.img} alt={props.title}/> */}
            <h3>{props.title}</h3>
        </div>
    )
}

const Test = () => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    return (
        <div style={{width: '90vw'}}>
            <Slider {...settings}>
                {
                    cats.map((cat, i) => {
                        return (
                            <CatItem title={cat.CatName} img={cat.img} key={i}/>
                        )
                    })
                }
            </Slider>
        </div>

    )
  }

const MainPage = (props) => {

    return (
        <div className="main-page">
            <header >
                <Link id="main-page-header-logo" to="/">
                    <span>LOGO</span>
                </Link>
                <Link id="main-page-header-log-in" to="/login">
                    <span id="svg-container"><FaRegUserCircle/></span>
                    <span>LOG IN</span>
                </Link>    
            </header>
            <main>
                <div id="main-body">
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

export default MainPage;