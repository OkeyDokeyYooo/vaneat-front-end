import React, { useEffect }from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import fakeFavorite from '../../fakeFavorite.json'
import API from '../../API'


const BookmarkSection = props => {

    const user = useSelector(state => state.user)

    useEffect(() => {
        axios.get(API.userFavorite, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res)
        })
    }, [])

    return (
        <section className="profile-page-main-body">
            <div className="profile-page-favorite-section">
                <div className="profile-page-main-body-title">Favorite</div>
                <div className="profile-favorite-main-body">
                    {
                        fakeFavorite.map((restaurant, index) => {
                            return (
                                <Link className="favorite-container" to={`/restaurants/${restaurant.name}`} key={index}>
                                    <div className="favorite-image-container">
                                        <img src={restaurant.image} alt={restaurant.name}/>
                                        <span id="favorite-restaurant-rate">
                                            {restaurant.rate}
                                        </span>
                                    </div>
                                    <h3>
                                        {restaurant.name}
                                    </h3>
                                    <h6>
                                        {restaurant.location}
                                    </h6>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default BookmarkSection