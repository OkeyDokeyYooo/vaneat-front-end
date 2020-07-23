import React from 'react';
import '../Widgets/Widgets.css'
import RestList from './RestItem'

import fake from '../../fakeRest.json';

const RestItems = () => {
    return (
    <div className="RestDiv">
        <h2>Popular Restaurant</h2>
        <div className="RestUl">
            {
                fake.map((cats,index)=>{
                    return(
                            <RestList 
                                img={cats.image}
                                name={cats.name}
                                location={cats.location}
                                tel={cats.telephone}
                                rate={cats.rate}
                                key={index}
                            />
                    )
            })}
        </div>
    </div>
    )
}

export default RestItems;