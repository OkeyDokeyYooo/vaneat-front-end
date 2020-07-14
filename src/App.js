import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import './App.css';

// components
import MainPage from './components/MainPage/MainPage';
import Restaurants from './components/Restaurants/Restaurants';
import CategoryPage from './components/Category/CategoryPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route path="/restaurants" component={Restaurants} />
        
        <Route path="/category/:catName" component={CategoryPage} />
      </Switch>
    </div>
  );
}

export default App;
