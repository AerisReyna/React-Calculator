import React from 'react';
import './App.css';

// class Display extends React.Component {

// }

// class Toolbar extends React.Component {

// }

// class Inputs extends React.Component {

// }

class Button extends React.Component {
  render() {
    const classes = "btn btn-dark " + this.props.type;
    return (
      <button type="button" className={classes}>{this.props.value}</button>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <Button type="btn-input" value="+" />
      // <Display />
      // <Toolbar />
      // <Inputs />
    );
  }
}

function App() {
  return (
    <Calculator />
  );
}

export default App;
