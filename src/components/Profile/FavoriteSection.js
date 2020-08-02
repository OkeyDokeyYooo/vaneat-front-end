import React from 'react'
import { Link } from 'react-router-dom'
import fakeFavorite from '../../fakeFavorite.json'


const BookmarkSection = props => {
    return (
        <section className="profile-page-main-body">
            <div className="profile-page-favorite-section">
                <div className="profile-page-main-body-title">Favorite</div>
                <div className="profile-favorite-main-body">
                    {
                        fakeFavorite.map(restaurant => {
                            return (
                                <Link className="favorite-container" to={`/restaurants/${restaurant.name}`}>
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