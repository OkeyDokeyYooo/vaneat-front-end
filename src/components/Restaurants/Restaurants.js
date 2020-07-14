import React from 'react'
import { useRouteMatch, Switch, Route} from 'react-router-dom'

//components 
import RestaurantsMainPage from './MainPage';

const Restaurants = () => {
    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}`}>
                    <RestaurantsMainPage />
                </Route>
                <Route path={`${match.path}/:restId`}>
                    Specific Restaurants
                </Route>
            </Switch>
        </div>
    )
}

export default Restaurants;