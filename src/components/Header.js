/**
 * Created by cqian19 on 5/20/2017.
 */

import React from 'react';
import { APP_TITLE } from '../core/constants';

class Header extends React.Component {

    render() {
        return (
            <div className="header height-collapse">
                <h1>
                    { APP_TITLE }
                </h1>
            </div>
        )
    }
}

export default Header