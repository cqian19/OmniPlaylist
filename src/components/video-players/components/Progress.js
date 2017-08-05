/**
 * Created by cqian19 on 8/3/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { formatMilliseconds } from './utils';

class Progress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            hoverElapsed: '00:00'
        }
    }

    _calculatePercentDone(event) {
        event = event.nativeEvent;
        const progressBarRect = document.getElementById("player-progress").getBoundingClientRect();
        const clickX = event.pageX;
        const percentDone = (clickX - progressBarRect.left) / progressBarRect.width;
        return percentDone
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
            hoverElapsed: formatMilliseconds(newTimeElapsed)
        })
    };

    handleMouseLeave = () => {
        this.setState({hover: false});
    };

    _generateTooltip = () => {
        const { hoverElapsed } = this.state;
        return (
            <Tooltip style={{'left': '50px', 'position': 'fixed'}} placement="top" className="in" id="tooltip-top">
                {hoverElapsed}
            </Tooltip>
        );
    };

    render() {
        const { position, elapsed, total } = this.props;
        const { hover, hoverElapsed } = this.state;
        const tooltip = this._generateTooltip();
        return (
            <div className="player__time">
                <span className="player__time-elapsed">{elapsed}</span>
                <OverlayTrigger placement="top" overlay={tooltip}>
                    <ProgressBar
                        onClick={this.handleClick}
                        onMouseMove={this.handleHover}
                        onMouseLeave={this.handleMouseLeave}
                        now={position}
                        max={1}
                        id="player-progress"
                    />
                </OverlayTrigger>
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