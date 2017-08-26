/**
 * Created by cqian19 on 8/20/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { APP_TITLE } from '../core/constants';

let remote = '';
class TitleBar extends React.Component {

    constructor() {
        super();
        remote = require('electron').remote;
        this.browserWindow = remote.getCurrentWindow();
        this.state = {
            hideActive: false,
            pinActive: false,
            fullScreenActive: false
        };
    }

    handleAppPin = () => {
        const { pinActive } = this.state;
        this.browserWindow.setAlwaysOnTop(!pinActive);
        this.setState({pinActive: !pinActive});
    };

    handleAppHideExtra = () => {
        const { onHideToggle } = this.props;
        const { hideActive } = this.state;
        onHideToggle();
        this.setState({hideActive: !hideActive});
    };

    handleFullScreen = () => {
        const { fullScreenActive } = this.state;
        this.browserWindow.setFullScreen(!fullScreenActive);
        this.setState({fullScreenActive: !fullScreenActive});
    };

    handleAppClose = () => {
        this.browserWindow.close();
    };

    render() {
        const { pinActive, fullScreenActive, hideActive } = this.state;
        const pinClassNames = classNames({
            'app-pin-button': true,
            'active': pinActive
        });
        const hideClassNames = classNames({
            'app-hide-extra-button': true,
            'active': hideActive
        });
        const fullScreenClassNames = classNames({
            'app-full-button': true,
            'active': fullScreenActive
        });
        return (
            <div className="titlebar">
                <span className="titlebar__header">
                    {APP_TITLE}
                </span>
                <span className="titlebar__menu">
                    {/* Pin button */}
                    <span className={pinClassNames} onClick={this.handleAppPin}>
                        <i className="glyphicon glyphicon-pushpin" />
                    </span>
                    {/* Hide extra button */}
                    <span className={hideClassNames} onClick={this.handleAppHideExtra}>
                        <i className="glyphicon glyphicon-fullscreen" />
                    </span>
                    {/* Full screen button */}
                    <span className={fullScreenClassNames} onClick={this.handleFullScreen}>
                        <i className="glyphicon glyphicon-unchecked" />
                    </span>
                    {/* Close button */}
                    <span className="app-close-button" onClick={this.handleAppClose}>
                        <i className="glyphicon glyphicon-remove" />
                    </span>
                </span>
            </div>
        )
    }
}

TitleBar.propTypes = {
    onHideToggle: PropTypes.func.isRequired
};
export default TitleBar;