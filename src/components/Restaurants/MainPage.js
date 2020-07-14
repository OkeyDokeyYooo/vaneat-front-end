import React from 'react';
import {Link} from 'react-router-dom';

import fake from '../../fakeCategory.json';

const MainPage = () => {
    return (
        <div>
            <ul>
                {fake.map((cat, i) => {
                    return (
                        <li key={i}>
                            <Link to={`/category/${cat.CategoryName}`} > {cat.CategoryName} </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MainPage;