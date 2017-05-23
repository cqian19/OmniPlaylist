/**
 * Created by cqian19 on 5/21/2017.
 */

import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <Nav bsStyle="pills" activeKey ={1} justified onSelect={this.props.handleSelect}>
                    {this.props.navs.map((nav) =>
                        <NavItem key={nav.key} eventKey={nav.key}>{nav.text}</NavItem>
                    )}
                </Nav>
            </div>
        )
    }
}

export default NavBar