/**
 * Created by cqian19 on 8/3/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBar } from 'react-bootstrap';

import { formatMilliseconds } from './utils';

class Progress extends React.Component {

    handleClick = (event) => {
        event = event.nativeEvent;
        const { video, onProgressClick } = this.props;
        const progressBar = document.getElementById("player-progress");
        const clickX = event.pageX;
        const percentDone = (clickX - progressBar.offsetLeft) / progressBar.clientWidth;
        const newTimeElapsed = percentDone * video.duration;
        onProgressClick({
            timeElapsed: newTimeElapsed,
            playFromPosition: newTimeElapsed,
            elapsed: formatMilliseconds(newTimeElapsed),
            position: percentDone
        });
    };

    render() {
        const { position, elapsed, total } = this.props;
        return (
            <div>
                <span className="player__time-elapsed">{elapsed}</span>
                <ProgressBar
                    onClick={this.handleClick}
                    now={position}
                    max={1}
                    id="player-progress"
                />
                <span className="player__time-total">{total}</span>
            </div>
        )
    }
}

Progress.propTypes = {
    elapsed: PropTypes.string.isRequired,
    onProgressClick: PropTypes.func.isRequired,
    position: PropTypes.number.isRequired,
    total: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired
};

export default Progress;