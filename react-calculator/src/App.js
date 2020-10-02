import React from 'react';
import './App.css';
import { FaHistory, FaRetweet, FaAtom, FaBackspace, FaCog }  from 'react-icons/fa';

class Display extends React.Component {
  render() {
    return(
      <div className="display">
        <div className="display-input">
          7+7
        </div>
        <div className="display-result">
          49
        </div>
      </div>
    );
  }
}

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button className="btn-toolbar btn-settings" value="settings"><FaCog/></button>
        <button className="btn-toolbar btn-history" value="history"><FaHistory/></button>
        <button className="btn-toolbar btn-convert" value="convert"><FaRetweet/></button>
        <button className="btn-toolbar btn-mode" value="mode"><FaAtom/></button>
        <button className="btn-toolbar btn-backspace" value="backspace"><FaBackspace/></button>
      </div>
    );
  }
}

class Inputs extends React.Component {
  render() {
    return (
      <div className="inputs">
        <button className="btn-input" value="( )">( )</button>
        <button className="btn-input" value="%">%</button>
        <button className="btn-input" value="/">/</button>
        <button className="btn-input" value="C">C</button>
        <button className="btn-input" value="7">7</button>
        <button className="btn-input" value="8">8</button>
        <button className="btn-input" value="9">9</button>
        <button className="btn-input" value="*">*</button>
        <button className="btn-input" value="4">4</button>
        <button className="btn-input" value="5">5</button>
        <button className="btn-input" value="6">6</button>
        <button className="btn-input" value="-">-</button>
        <button className="btn-input" value="1">1</button>
        <button className="btn-input" value="2">2</button>
        <button className="btn-input" value="3">3</button>
        <button className="btn-input" value="+">+</button>
        <button className="btn-input" value="+/-">+/-</button>
        <button className="btn-input" value="0">0</button>
        <button className="btn-input" value=".">.</button>
        <button className="btn-input" value="=">=</button>
      </div>
    );
  }
}

// This class turned out to be not so useful.
//
// class Button extends React.Component {
//   render() {
//     const classes = "btn btn-dark " + this.props.type;
//     return (
//       <button type="button" className={classes}>{this.props.value}</button>
//     );
//   }
// }

class Calculator extends React.Component {
  render() {
    return (
      <div className="calculator">
        <Display />
        <Toolbar />
        <Inputs />
      </div>
    );
  }
}

function App() {
  return (
    <Calculator />  
  );
}

export default App;
