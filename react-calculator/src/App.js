import React from 'react';
import './App.css';
import { FaHistory, FaRetweet, FaAtom, FaBackspace, FaCog }  from 'react-icons/fa';

class Display extends React.Component {
  render() {
    return(
      <div className="display">
        <div className="display-input">
          {this.props.input}
        </div>
        <div className="display-result">
          null
        </div>
      </div>
    );
  }
}

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button className="btn-toolbar btn-settings" name="settings" value="settings" onClick={this.props.handleButtonPress}><FaCog/></button>
        <button className="btn-toolbar btn-history" value="history" onClick={this.props.handleButtonPress}><FaHistory/></button>
        <button className="btn-toolbar btn-convert" value="convert" onClick={this.props.handleButtonPress}><FaRetweet/></button>
        <button className="btn-toolbar btn-mode" value="mode" onClick={this.props.handleButtonPress}><FaAtom/></button>
        <button className="btn-toolbar btn-backspace" value="backspace" onClick={this.props.handleButtonPress}><FaBackspace/></button>
      </div>
    );
  }
}

class Inputs extends React.Component {
  render() {
    return (
      <div className="inputs">
        <button className="btn-input" value="C"onClick={this.props.handleButtonPress}>C</button>
        <button className="btn-input" value="( )" onClick={this.props.handleButtonPress}>( )</button>
        <button className="btn-input" value="%"onClick={this.props.handleButtonPress}>%</button>
        <button className="btn-input" value="/"onClick={this.props.handleButtonPress}>/</button>
        <button className="btn-input" value="7"onClick={this.props.handleButtonPress}>7</button>
        <button className="btn-input" value="8"onClick={this.props.handleButtonPress}>8</button>
        <button className="btn-input" value="9"onClick={this.props.handleButtonPress}>9</button>
        <button className="btn-input" value="*"onClick={this.props.handleButtonPress}>*</button>
        <button className="btn-input" value="4"onClick={this.props.handleButtonPress}>4</button>
        <button className="btn-input" value="5"onClick={this.props.handleButtonPress}>5</button>
        <button className="btn-input" value="6"onClick={this.props.handleButtonPress}>6</button>
        <button className="btn-input" value="-"onClick={this.props.handleButtonPress}>-</button>
        <button className="btn-input" value="1"onClick={this.props.handleButtonPress}>1</button>
        <button className="btn-input" value="2"onClick={this.props.handleButtonPress}>2</button>
        <button className="btn-input" value="3"onClick={this.props.handleButtonPress}>3</button>
        <button className="btn-input" value="+"onClick={this.props.handleButtonPress}>+</button>
        <button className="btn-input" value="+/-"onClick={this.props.handleButtonPress}>+/-</button>
        <button className="btn-input" value="0"onClick={this.props.handleButtonPress}>0</button>
        <button className="btn-input" value="."onClick={this.props.handleButtonPress}>.</button>
        <button className="btn-input" value="="onClick={this.props.handleButtonPress}>=</button>
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
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      inputHistory: [],
      lastKey: "0",
      leftParenthesis: false,
      doubleZeroOkay: false,
      decimalUsed: false,
      // This is false after an operator has been entered and true upon the first nonzero int
    }
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }
  
  processInput() {
    // first pass for parentheses, second for division/multiplication, final pass fir addition/substraction. All left to right.
  }
  
  handleButtonPress(e) {
    var keyPressed = e.target.getAttribute('value');
    
    switch(keyPressed) {
      case '0':
        // Ignore input in the cases where adding another zero wouldn't make sense.
        if (!(this.state.doubleZeroOkay) && (this.state.lastKey === keyPressed)) {
          return;
        }
        break;
      case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case'9':
        // Replaces the zero in contexts where the zero is unnecessary.
        if (this.state.lastKey === "0" && !this.state.doubleZeroOkay) {
          var editedInput = this.state.input.slice(0, this.state.input.length - 1)
          this.setState({
            input: editedInput + keyPressed,
            lastKey: keyPressed,
            doubleZeroOkay: true,
          });
          return;
        }
        this.setState({
          doubleZeroOkay: true,
        });
        break;
      case '.':
        if (this.state.lastKey === "." || this.state.decimalUsed) {
          return;
        }
        this.setState({
          doubleZeroOkay: true,
          decimalUsed: true,
        });
        break;
      case '+': case '-': case '*': case '/':
        if (this.state.lastKey === "*" || this.state.lastKey === "/" || this.state.lastKey === "+" || this.state.lastKey === "-") {
          this.setState({
            input: this.state.input.slice(0, this.state.input.length - 1) + keyPressed,
            lastKey: keyPressed,
          });
          return;
        }
        this.setState({
          doubleZeroOkay: false,
          decimalUsed: false,
        });
        break;
      case 'C':

      case "( )":

      case "%":

      case "+/-":

      case "=":
    }
    this.setState({
      input: this.state.input + keyPressed,
      lastKey: keyPressed,
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display input={this.state.input}/>
        <Toolbar handleButtonPress={this.handleButtonPress}/>
        <Inputs handleButtonPress={this.handleButtonPress}/>
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
