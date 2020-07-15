import React, {useState, useEffect} from 'react';
import ReactStars from "react-rating-stars-component";
import fake from '../../fakeCategory.json'

const CategoryPage = (props) => {
    // Getting the category name from the params
    let {catName} = props.match.params

    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        // Should GET information from back server using axios.get
        // Now, loading information from fake data
        setRestaurants(fake.find(cat => cat.CategoryName === catName).Restaurants)

    }, [])
    
    return (
        <div>
            {
                restaurants &&
                restaurants.map((restaurant, index) => {
                    // should render widget of card of restaurants
                    return (
                        <div key={index}>
                            <h5>{restaurant.name}</h5>
                            <h6>{restaurant.location}</h6>
                            <h6>{restaurant.telephone}</h6>
                            <ReactStars count={5} edit={false} value={restaurant.rate}/>
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategoryPage;