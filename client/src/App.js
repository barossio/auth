import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';


function App(props) {
  return (
    <div className="App container">
      <Header/>
      {props.children}
    </div>
  )
}
/*class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}*/

export default App;
