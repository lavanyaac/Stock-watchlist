import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import {component} from 'react-dom';



window.jQuery = window.$ = require('jquery');

ReactDOM.render(
	<HashRouter>
    <div className="main">
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
    </div>
  </HashRouter>
, document.getElementById('app'));
