import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

function App() {
  console.log('app');

  return (
    <div className="App">
      
      <Router>
        <Route exact path="/" render={()=>(<Redirect to="/upload" />)} />
        <Route exact path="/country" component={Dashboard} />
        <Route exact path="/game" component={Dashboard} />
        <Route exact path="/country-game" component={Dashboard} />
        <Route exact path="/upload" component={Dashboard} />
      </Router>
    </div>
  );
}


export default App;
