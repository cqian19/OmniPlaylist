/**
 * Created by cqian19 on 8/20/2017.
 */
import React from 'react';
import { remote } from 'electron';
import classNames from 'classnames';

class TitleBar extends React.Component {

    constructor() {
        super();
        this.browserWindow = remote.getCurrentWindow();
        this.state = {
            pinActive: false,
            fullScreenActive: false
        }
    }

    handleAppPin = () => {
        const { pinActive } = this.state;
        this.browserWindow.setAlwaysOnTop(!pinActive);
        this.setState({pinActive: !pinActive});
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
        const { pinActive, fullScreenActive } = this.state;
        const pinClassNames = classNames({
            'app-pin-button': true,
            'active': pinActive
        });
        const fullScreenClassNames = classNames({
            'app-full-button': true,
            'active': fullScreenActive
        });
        return (
            <div className="titlebar">
                <span className="titlebar__header">
                    Player
                </span>
                <span className="titlebar__menu">
                    {/* Pin button */}
                    <span className={pinClassNames} onClick={this.handleAppPin}>
                        <i className="glyphicon glyphicon-pushpin" />
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

export default TitleBar;