import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Helmet } from 'react-helmet'
// component
import Header from '../Widgets/Header'
import FavoriteSection from './FavoriteSection'
import ReviewSection from './ReviewSection'
import ErrorPage from '../Error/Error'

import "./Profile.css"
import bannerImage from '../../img/user-banner.jpg'
import defaultAvatar from "../../img/avatar.webp"

const Profile = props => {

    const user = useSelector(state => state.user)
    const [section, setSection] = useState("reviews")

    return (
        <div>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Header />
            { user.isLogIn ?
                <div className="profile-page-wrapper">
                    <section className="profile-page-user-banner-section">
                        <div id="user-summary-wrapper">
                            <div className="profile-user-banner-wrapper">
                                <img  src={bannerImage} alt="user-banner"/>
                            </div>
                            <div className="profile-user-avatar-wrapper">
                                <img src={user.avatar ? user.avatar : defaultAvatar} alt="user-avatar"/>
                            </div>
                            <div className="profile-user-info">
                                <div className="profile-user-name">{user.username}</div>
                                <div className="user-level">
                                    <span className="user-level-left">Level 1</span>
                                    <span className="user-level-right">(150 Points to level up)</span>
                                </div>
                            </div>
                            <div className="profile-user-count-wrapper">
                                <div className="profile-user-count" onClick={() => setSection('reviews')}>
                                    <div className="profile-user-count-number">
                                        {user.reviews.length}
                                    </div>
                                    <div className="profile-user-count-text">
                                        Reviews
                                    </div>
                                </div>
                                <div className="profile-user-count" onClick={() => setSection('bookmarks')}>
                                    <div className="profile-user-count-number">
                                        {user.favorites.length}
                                    </div>
                                    <div className="profile-user-count-text">
                                        Favorite
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {
                        section === "bookmarks" && 
                        <FavoriteSection userId={user.id}/>
                    } 
                    {
                        section === "reviews" &&
                        <ReviewSection userId={user.id}/>
                    }
                </div> :
                <ErrorPage />
            }
        </div>
    )
}

export default Profile