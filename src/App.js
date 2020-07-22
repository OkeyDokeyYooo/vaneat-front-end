import React, {Component} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";


// components
import MainPage from './components/MainPage/MainPage';
import Restaurants from './components/Restaurants/Restaurants';
import CategoryPage from './components/Category/CategoryPage'





class App extends Component {

  componentDidMount() {
    // call api to fetch info
  }

  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/restaurants" component={Restaurants} />

        <Route path="/category/:catName" component={CategoryPage} />

        <Route path="/" component={MainPage} />

      </Switch>
    </div>
    )
  }
}

export default App;