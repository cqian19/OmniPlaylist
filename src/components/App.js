import '../assets/stylesheets/base.scss';
import React from 'react';
import Header from './Header';
import NavBarContainer from '../containers/NavBarContainer';

class App extends React.Component {

    componentWillMount() {
        this.props.onLoad();
    }

    render() {
        return(
            <div>
                <Header />
                <NavBarContainer />
            </div>
        )
    }
}

export default App;
