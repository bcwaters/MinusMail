import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.js'

//This is rendered server side so hyrdate connects client DOM to server DOM
ReactDOM.hydrate(
	<Router>
		<App />
	</Router>,
	document.getElementById('app')
);
