/**
 * Created by cqian19 on 8/3/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button, Glyphicon } from 'react-bootstrap';

class Buttons extends React.Component {

    render() {
        const { playStatus, togglePlay, stop } = this.props;
        const playPauseClass = classNames({
            'glyphicon': true,
            'glyphicon-play': playStatus !== 'PLAYING',
            'glyphicon-pause': playStatus === 'PLAYING'
        });
        return (
            <div className="player__buttons">
                {/*Play/Pause Button*/}
                <span className="btn icon-btn" onClick={togglePlay}>
                    <i className={playPauseClass} />
                </span>
                {/*Stop Button*/}
                <span className="btn icon-btn" onClick={stop}>
                    <i className="glyphicon glyphicon-stop" />
                </span>
            </div>
        )
    }
}

Buttons.propTypes = {
    playStatus: PropTypes.string.isRequired,
    stop: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired
};

export default Buttons;