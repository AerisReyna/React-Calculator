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
          {this.props.lastResult}
        </div>
      </div>
    );
  }
}

class Toolbar extends React.Component {
  render() {
    return (
      <div className="toolbar">
        <button className="btn-toolbar btn-settings" name="settings" value="settings" onClick={this.props.handleButtonPress}><FaCog className="fa"/></button>
        <button className="btn-toolbar btn-history" value="history" onClick={this.props.handleButtonPress}><FaHistory className="fa"/></button>
        <button className="btn-toolbar btn-convert" value="convert" onClick={this.props.handleButtonPress}><FaRetweet className="fa"/></button>
        <button className="btn-toolbar btn-mode" value="mode" onClick={this.props.handleButtonPress}><FaAtom className="fa"/></button>
        <button className="btn-toolbar btn-backspace" value="backspace" onClick={this.props.handleButtonPress}><FaBackspace className="fa"/></button>
      </div>
    );
  }
}

class Inputs extends React.Component {
  render() {
    return (
      <div className="inputs">
        <button className="btn-input" value="C" onClick={this.props.handleButtonPress}>C</button>
        <button className="btn-input" value="( )" onClick={this.props.handleButtonPress}>( )</button>
        <button className="btn-input" value="%" onClick={this.props.handleButtonPress}>%</button>
        <button className="btn-input" value="÷" onClick={this.props.handleButtonPress}>÷</button>
        <button className="btn-input" value="7" onClick={this.props.handleButtonPress}>7</button>
        <button className="btn-input" value="8" onClick={this.props.handleButtonPress}>8</button>
        <button className="btn-input" value="9" onClick={this.props.handleButtonPress}>9</button>
        <button className="btn-input" value="*" onClick={this.props.handleButtonPress}>*</button>
        <button className="btn-input" value="4" onClick={this.props.handleButtonPress}>4</button>
        <button className="btn-input" value="5" onClick={this.props.handleButtonPress}>5</button>
        <button className="btn-input" value="6" onClick={this.props.handleButtonPress}>6</button>
        <button className="btn-input" value="-" onClick={this.props.handleButtonPress}>-</button>
        <button className="btn-input" value="1" onClick={this.props.handleButtonPress}>1</button>
        <button className="btn-input" value="2" onClick={this.props.handleButtonPress}>2</button>
        <button className="btn-input" value="3" onClick={this.props.handleButtonPress}>3</button>
        <button className="btn-input" value="+" onClick={this.props.handleButtonPress}>+</button>
        <button className="btn-input" value="+/-" onClick={this.props.handleButtonPress}>+/-</button>
        <button className="btn-input" value="0" onClick={this.props.handleButtonPress}>0</button>
        <button className="btn-input" value="." onClick={this.props.handleButtonPress}>.</button>
        <button className="btn-input" value="=" onClick={this.props.handleButtonPress}>=</button>
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
      lastResult: "0",
      inputHistory: [],
      lastKey: "0",
      leftParenthesis: 0,
      doubleZeroOkay: false,
      decimalUsed: false,
      // This is false after an operator has been entered and true upon the first nonzero int
    }
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  findOperatorToLeft(exp, rightIndex) {
    var leftIndex;
    const pattern = /[+\-*÷(]/gm;
    for (leftIndex = rightIndex - 1; leftIndex >= 0; leftIndex--) {
      if (pattern.test(exp.charAt(leftIndex))) {
        if (leftIndex === 0) {
          return -1;
        }
        if (pattern.test(exp.charAt(leftIndex - 1))) {
          return leftIndex - 1;
        }
        break;
      }
    }
    return leftIndex;
  }

  findOperatorToRight(exp, leftIndex) {
    var rightIndex;
    const pattern = /[+\-*÷)]/gm;
    for (rightIndex = leftIndex + 2; rightIndex < exp.length; rightIndex++) {
      if (pattern.test(exp.charAt(rightIndex))) {
        break;
      }
    }
    if (rightIndex === exp.length) {
      return -1;
    }
    return rightIndex;
  }

  simplifyPercents(inputString) {
    var exp = inputString.slice(0);
    var percentIndex = exp.indexOf("%");
    while (percentIndex > 0) {
      var operatorIndex = this.findOperatorToLeft(exp, percentIndex);
      if (operatorIndex === -1) {
        break;
      } else {
        var percent = parseFloat(exp.substring(operatorIndex + 1, percentIndex)) / 100;
        exp = exp.slice(0, operatorIndex + 1) + percent + exp.slice(percentIndex + 1);
      }
      percentIndex = exp.indexOf("%", percentIndex + 1);
    }
    return exp;
  }
  
  computeWithOperator(expression, operator) {
    var exp = expression.slice(0);
    var operatorIndex = exp.indexOf(operator);
    if (operator === "-" && operatorIndex === 0) {
      operatorIndex = exp.indexOf(operator, 1);
    }
    while (operatorIndex > 0) {
      var firstOperand;
      var leftIndex = this.findOperatorToLeft(exp, operatorIndex);
      firstOperand = parseFloat(exp.slice(leftIndex + 1));

      var secondOperand = parseFloat(exp.slice(operatorIndex + 1));
      var result;
      switch(operator) {
        case "+":
          result = firstOperand + secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "*":
          result = firstOperand * secondOperand;
          break;
        case "÷":
          result = firstOperand / secondOperand;
          break;
      }

      var rightIndex = this.findOperatorToRight(exp, operatorIndex);

      if (rightIndex !== -1) {
        exp = exp.slice(0, leftIndex + 1) + result + exp.slice(rightIndex);
      } else {
        exp = exp.slice(0, leftIndex + 1) + result;
      }
      operatorIndex = exp.indexOf(operator);
    }
    return exp;
  }

  simplifyExpression(expression) {
    var exp = expression.slice(0);
    exp = this.computeWithOperator(exp, "*");
    exp = this.computeWithOperator(exp, "÷");
    exp = this.computeWithOperator(exp, "+");
    exp = this.computeWithOperator(exp, "-");
    return exp;
  }

  // * ((7+8)(6+1))

  processInput(expression) {
    var exp = this.simplifyPercents(expression);
    var rightParenthesisIndex = exp.indexOf(")");
    var leftParenthesisIndex = exp.indexOf("(");
    var i;
    while (rightParenthesisIndex > 0) {
      while (true) {
        i = exp.indexOf("(", leftParenthesisIndex + 1);
        if (i < 0 || i > rightParenthesisIndex) {
          break;
        } else {
          leftParenthesisIndex = i;
        }
      }
      var simplified = this.simplifyExpression(exp.slice(leftParenthesisIndex + 1, rightParenthesisIndex))
      exp = exp.slice(0, leftParenthesisIndex) + simplified + exp.slice(rightParenthesisIndex + 1);
      rightParenthesisIndex = exp.indexOf(")");
      leftParenthesisIndex = exp.indexOf("(");
    }
    return this.simplifyExpression(exp);
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
        if (this.state.lastKey === ")") {
          this.setState({
            input: this.state.input + "*" + keyPressed,
            lastKey: keyPressed,
            doubleZeroOkay: true,
          });
          return;
        }
        // Replaces the zero in contexts where the zero is unnecessary.
        if (this.state.lastKey === "0" && !this.state.doubleZeroOkay) {
          var editedInput = this.state.input.slice(0, this.state.input.length - 1)
          this.setState({
            input: editedInput + keyPressed,
            lastKey: keyPressed,
            doubleZeroOkay: true,
          });
          // Returns here because this is different than default behavior.
          return;
        }
        // Multiple zeroes are always okay after a number has been pressed.
        this.setState({
          doubleZeroOkay: true,
        });
        break;
      case '.':
        // Ignores input when a decimal has already been put in.
        if (this.state.lastKey === "." || this.state.decimalUsed) {
          return;
        }
        this.setState({
          doubleZeroOkay: true,
          decimalUsed: true,
        });
        break;
      case '+': case '-': case '*': case '÷':
        // * Minus needs to be altered to pass freecodecamp test. *
        // Operators are replaced with new ones when they are input in succession.
        // * Condition here for when there's a 0 and a past result.
        if (this.state.input === "0") {
          this.setState({
            input: this.state.lastResult + keyPressed,
            lastKey: keyPressed,

          })
        }
        if (this.state.lastKey === "*" || this.state.lastKey === "÷" || this.state.lastKey === "+" || this.state.lastKey === "-") {
          this.setState({
            input: this.state.input.slice(0, this.state.input.length - 1) + keyPressed,
            lastKey: keyPressed,
          });
          return;
        }
        if (this.state.input === "0") {
          return;
        }
        this.setState({
          doubleZeroOkay: false,
          decimalUsed: false,
        });
        break;
      case 'C':
        this.setState({
          input: "0",
          lastResult: "0",
          lastKey: "0",
          leftParenthesis: 0,
          doubleZeroOkay: false,
          decimalUsed: false,
        })
        return;
      case "( )":
        var lastKey = this.state.lastKey;
        if (lastKey === "0" && this.state.input.length === 1) {
          this.setState({
            input: "(",
            lastKey: "(",
            leftParenthesis: this.state.leftParenthesis + 1,
          })
        }
        if (this.state.leftParenthesis > 0) {
          if (lastKey === "+" || lastKey === "-" || lastKey === "*" || lastKey === "÷" || lastKey === ".") {
            return;
          } else if (lastKey === "(") {
            this.setState({
              input: this.state.input + "(",
              lastKey: "(",
              leftParenthesis: this.state.leftParenthesis + 1,
            })
          } else {
            this.setState({
              input: this.state.input + ")",
              lastKey: ")",
              leftParenthesis: this.state.leftParenthesis - 1,
            });
            return;
          }
        }
        if (lastKey === "+" || lastKey === "-" || lastKey === "*" || lastKey === "÷") {
          this.setState({
            input: this.state.input + "(",
            lastKey: "(",
            leftParenthesis: this.state.leftParenthesis + 1,
          })
          return;
        }
        return;
      case "%":
        var lastKey = this.state.lastKey;
        if (lastKey === "+" || lastKey === "-" || lastKey === "*" || lastKey === "÷" || lastKey === "." || lastKey === "(" || lastKey === ")") {
          return;
        }
        break;
      case "+/-":
        var lastKey = this.state.lastKey;
        if (lastKey === "+" || lastKey === "-" || lastKey === "*" || lastKey === "÷" || lastKey === "." || lastKey === "(" || lastKey === ")") {
          return;
        }
        var operatorIndex = this.findOperatorToLeft(this.state.input, this.state.input.length - 1);
        if(this.state.input.charAt(operatorIndex) === "-") {
          if (this.state.input.charAt(this.findOperatorToLeft(this.state.input, this.state.input.length - 2)) === "-") {
            this.setState({
              input: this.state.input.slice(0, operatorIndex) + this.state.input.slice(-1),
            });
            return;
          }
        }
        var input = this.state.input;
        this.setState({
          input: input.slice(0, input.length - 1) + "-" + input.slice(input.length - 1, input.length ),
          lastKey: input.slice(input.length),
        });
        return;
      case "=":
        if (this.state.lastKey === "*" || this.state.lastKey === "÷" || this.state.lastKey === "+" || this.state.lastKey === "-") {
          return;
        }
        var parentheses = "";
        if (this.state.leftParenthesis > 0) {
          for (var i = this.state.leftParenthesis; i > 0; i--) {
            parentheses = parentheses + ")";
          }
        }
        var result = this.processInput(this.state.input +  parentheses);
        this.setState({
          input: "0",
          lastResult: result,
          inputHistory: this.state.inputHistory.concat(result),
          lastKey: "0",
          leftParenthesis: 0,
          doubleZeroOkay: false,
          decimalUsed: false,
        })
        return;
    }
    this.setState({
      input: this.state.input + keyPressed,
      lastKey: keyPressed,
    });
  }

  render() {
    return (
      <div className="calculator">
        <Display input={this.state.input} lastResult={this.state.lastResult}/>
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
