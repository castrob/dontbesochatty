import React, { Component } from "react";
import ReactDOM from "react-dom";
import './App.css';
import './chat-style.css';
// Imports

import Dashboard from './Dashboard';
import Store from './Store';
import Login from './Login';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { showPopup: true };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <Store>
              <Dashboard />
              {this.state.showPopup ? <Login closePopup={this.togglePopup.bind(this)} /> : null}
            </Store>
          </header>
        </div>
      </div>

    );
  }
}
export default App;
