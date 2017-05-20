import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';

class Hello extends React.Component {
  render() {
    return(
      <h1>Hello, {this.props.name}!</h1>
    )
  }
}

export default Hello;
