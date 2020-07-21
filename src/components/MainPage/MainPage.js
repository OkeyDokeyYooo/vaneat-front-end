import React from 'react'
import { Link } from 'react-router-dom'

import './MainPage.css'

const MainPage = (props) => {
    return (
        <div className="main-page">
            <header>Header</header>
            <main>
                <Link to="/restaurants">All restaurants</Link>
            </main>
            <footer>Footer</footer>
        </div>
    )
}

export default MainPage;