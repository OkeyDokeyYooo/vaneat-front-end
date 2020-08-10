import React, { useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
// import fakeFavorite from '../../fakeFavorite.json'
import API from '../../API'


const BookmarkSection = props => {

    const user = useSelector(state => state.user)
    const [favorites, setFavorites] = useState(null)

    useEffect(() => {
        axios.get(API.userFavorite, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                setFavorites(res.data.user_favorites)
            }
        })
    }, [])

    return (
        <section className="profile-page-main-body">
            <div className="profile-page-favorite-section">
                <div className="profile-page-main-body-title">Favorite</div>
                <div className="profile-favorite-main-body">
                    {
                        favorites &&
                        favorites.map((restaurant, index) => {
                            return (
                                <Link className="favorite-container" to={`/restaurants/${restaurant.restaurantId}`} key={index}>
                                    <div className="favorite-image-container">
                                        <img src={restaurant.image} alt={restaurant.name}/>
                                        <span id="favorite-restaurant-rate">
                                            {restaurant.rate.toFixed(1)}
                                        </span>
                                    </div>
                                    <h3>
                                        {restaurant.name}
                                    </h3>
                                    <h6>
                                        {restaurant.address}
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