/**
 * Created by cqian19 on 5/21/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class NavBar extends React.Component {

    render() {
        const { hideExtra, location } = this.props;
        const currentPath = location.pathname;
        const navClassNames = classNames({
            'navbar': true,
            'height-collapse': true,
            'hidden': hideExtra
        });
        return (
            <div className={navClassNames}>
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
    hideExtra: PropTypes.bool.isRequired,
    history:  PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match:    PropTypes.object.isRequired
};

export default NavBar