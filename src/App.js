import React from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe from './TicTacToe.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: null,
    };
  }

  handleSelect(value) {
    if (value === 'TicTacToe')
      this.setState({app:<TicTacToe/>});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span>
            <select onChange={(ev, foo) => this.handleSelect(ev.target.value)}>
              <option value="Select App">Select App</option>
              <option value="TicTacToe">TicTacToe</option>
            </select>
          </span>
          {this.state.app}
        </header>
      </div>
    );
  }
}

export default App;
