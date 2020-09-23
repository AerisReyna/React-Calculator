import React from 'react';
import ReactDOM from 'react-dom';


class Title extends React.Component {
  render() {
    return (<h1 className="h2">{this.props.label}</h1>)
  }
}

class Title extends React.Component {
  render() {
    return (<h1 className="h2">{this.props.label}</h1>)
  }
}

class Title extends React.Component {
  render() {
    return (<h1 className="h2">{this.props.label}</h1>)
  }
}

class Title extends React.Component {
  render() {
    return (<h1 className="h2">{this.props.label}</h1>)
  }
}

class Calculator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    return  (
      <div className="container text-center">
        <Title label={this.props.title} />
      </div>
    )
  }
}


ReactDOM.render(
  <Calculator title="React Calc"></Calculator>,
  document.getElementById('react-app')
);
