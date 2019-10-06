import React, { Component } from "react";
import './App.css';
import './chat-style.css';
// Imports

import Dashboard from './Dashboard';
import Store from './Store';
import Login from './Login';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { showPopup: !localStorage.getItem('username') };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <Store>
              {this.state.showPopup ? <Login closePopup={this.togglePopup.bind(this)} /> : null}
              <Dashboard />
            </Store>
          </header>
        </div>
      </div>

    );
  }
}
export default App;
