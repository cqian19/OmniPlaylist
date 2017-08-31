/**
 * Created by cqian19 on 8/3/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBar } from 'react-bootstrap';
import ProgressTooltip from './ProgressTooltip';

import { formatMilliseconds } from './utils';

class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            hoverElapsed: '00:00',
            mouseX: 50,
        }
    }

    _calculatePercentDone(event) {
        event = event.nativeEvent;
        const progressBarRect = document.getElementById("player-progress").getBoundingClientRect();
        const clickX = event.pageX;
        const percentDone = (clickX - progressBarRect.left) / progressBarRect.width;
        return percentDone;
    }

    handleClick = (event) => {
        const { video, onProgressClick } = this.props;
        const percentDone = this._calculatePercentDone(event);
        const newTimeElapsed = percentDone * video.duration;
        onProgressClick({
            timeElapsed: newTimeElapsed,
            elapsed: formatMilliseconds(newTimeElapsed),
            position: percentDone
        });
    };

    handleHover = (event) => {
        const { video } = this.props;
        const percentDone = this._calculatePercentDone(event);
        const newTimeElapsed = percentDone * video.duration;
        this.setState({
            hover: true,
            hoverElapsed: formatMilliseconds(newTimeElapsed),
            mouseX: event.clientX,
        });
    };

    handleMouseLeave = () => {
        this.setState({hover: false});
    };

    render() {
        const { position, elapsed, total } = this.props;
        const { hover, hoverElapsed, mouseX } = this.state;
        return (
            <div className="player__time">
                <span className="player__time-elapsed">{elapsed}</span>
                <ProgressTooltip
                    display={hover}
                    hoverElapsed={hoverElapsed}
                    progressBar={this.progressBar}
                    mouseX={mouseX}
                />
                <ProgressBar
                    id="player-progress"
                    ref={(e) => {this.progressBar = e; }}
                    onClick={this.handleClick}
                    onMouseMove={this.handleHover}
                    onMouseLeave={this.handleMouseLeave}
                    now={position}
                    max={1}
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