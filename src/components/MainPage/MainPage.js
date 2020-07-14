import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = (props) => {
    return (
        <div>
            <Link to="/restaurants">All restaurants</Link>
        </div>
    )
}

export default MainPage;