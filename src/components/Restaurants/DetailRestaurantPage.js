import React from 'react'

const DetailRestaurantPage = (props) => {

    const { name } = props.location.state

    return (
        <div className="detail-restaurant-page-wrapper">
            {name}
        </div>
    )
}

export default DetailRestaurantPage
