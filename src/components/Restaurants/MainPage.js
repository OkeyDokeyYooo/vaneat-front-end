import React from 'react';
import {Link} from 'react-router-dom';

// component
import Slider from '../Widgets/Sliders'
import Header from '../Widgets/Header'

import './MainPage.css'

const MainPage = () => {
    return (
        <div id="restaurant-main-page">
            <Header />
            <Slider />
        </div>
    )
}

export default MainPage;