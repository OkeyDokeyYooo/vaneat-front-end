import React from 'react';
import '../Widgets/Widgets.css'
import RestList from './RestItem'
import { useRouteMatch, Link} from 'react-router-dom'

// import fake from '../../fakeRest.json';

const RestItems = props => {

    const match = useRouteMatch()

    return (
        <div className="restaurant-list">
            {
                props.allRest && 
                props.allRest.map((restaurant,index)=>{
                    return(
                        <Link 
                            to={{
                                pathname: `${match.url}/${restaurant._id}`
                            }}
                            key={index}
                        >
                            <RestList 
                                img={restaurant.image}
                                name={restaurant.name}
                                location={restaurant.address}
                                tel={restaurant.phone_number}
                                rate={restaurant.rate}
                                // numOfRate={restaurant.reviews.length}
                                dollar={restaurant.average_price}
                                type={restaurant.category}
                                key={index}
                            />
                        </Link>
                    )
            })}
        </div>
    )
}

export default RestItems;