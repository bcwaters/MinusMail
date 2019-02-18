import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import EmailView from './components/EmailView.js'
import socket from './socket';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state= {   
            clientsideSocket: socket(),
            currentEmail: 'none'
            }
        }
    
  render() {
    return (
      <React.Fragment>
        <EmailView 
            registerHandler={(handleEmailFunction) => this.state.clientsideSocket.registerNewEmailHandler(handleEmailFunction)}
            setMyAddress={(newAddress) => this.state.clientsideSocket.setMyAddress(newAddress)}
        />
      </React.Fragment>
    );
  }
}