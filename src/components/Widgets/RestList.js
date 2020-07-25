import React from 'react';
import '../Widgets/Widgets.css'
import RestList from './RestItem'

import fake from '../../fakeRest.json';

const RestItems = () => {
    return (
        <div className="restaurant-list">
            {
                fake.map((cats,index)=>{
                    return(
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
                    )
            })}
        </div>
    )
}

export default RestItems;