/**
 * Created by cqian19 on 5/21/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends React.Component {

    render() {
        const currentPath = this.props.location.pathname;
        return (
            <div className="navbar height-collapse">
                <Nav bsStyle="pills" justified activeKey={currentPath}>
                    <LinkContainer exact to="/">
                        <NavItem eventKey="/">
                            Play
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/playlists">
                        <NavItem eventKey="/playlists">
                            Playlists
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </div>
        )
    }
}

NavBar.propTypes = {
    history:  PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match:    PropTypes.object.isRequired
};

export default NavBar