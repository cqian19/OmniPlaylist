import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Header from './Header';

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        return(
          <Header />
        )
    }
}

export default App;
