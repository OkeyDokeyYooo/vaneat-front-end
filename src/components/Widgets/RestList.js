import React from 'react';
import '../Widgets/Widgets.css'
import RestList from './RestItem'
import { useRouteMatch, Link} from 'react-router-dom'

import fake from '../../fakeRest.json';

const RestItems = () => {

    const match = useRouteMatch()

    return (
        <div className="restaurant-list">
            {
                fake.map((cats,index)=>{
                    return(
                        <Link 
                            to={{
                                pathname: `${match.url}/${cats.name}`,
                                state: {
                                    name: cats.name
                                }
                            }}
                        >
                            <RestList 
                                img={cats.image}
                                name={cats.name}
                                location={cats.location}
                                tel={cats.telephone}
                                rate={cats.rate}
                                numOfRate={cats.numOfRate}
                                dollar={cats.dollar}
                                type={cats.type}
                                key={index}
                            />
                        </Link>
                    )
            })}
        </div>
    )
}

export default RestItems;