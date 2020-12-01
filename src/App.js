import React from 'react';
import Home from './components/home'
import BeerIntro from './components/intro'
import {Switch, Route} from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route render={() => <h1>About Page!</h1>}path="/:beerId">
            <BeerIntro />
          </Route>
      </Switch>

    </div>
  );
}

export default App;

