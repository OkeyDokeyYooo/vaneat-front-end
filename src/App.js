import React, {Component} from 'react';
import {
  Switch,
  Route
} from "react-router-dom";


// components
import HomePage from './components/HomePage/HomePage';
import MainPage from './components/Restaurants/MainPage';
class App extends Component {

  componentDidMount() {
    // call api to fetch info
  }

  render() {
    return (
      <div className="App">
      <Switch>
        <Route path="/restaurants" component={MainPage} />

        <Route path="/" component={HomePage} />

      </Switch>
    </div>
    )
  }
}

export default App;