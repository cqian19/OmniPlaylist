/**
 * Created by cqian19 on 8/30/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { Tooltip } from 'react-bootstrap';

class ProgressTooltip extends React.Component {

    render() {
        const { hoverElapsed, mouseX, progressBar, display } = this.props;
        const top = progressBar ? findDOMNode(progressBar).getBoundingClientRect().top : 0;
        const tooltipStyle = {
            'left': `${mouseX - 25}px`,
            'top':  `${top - 55}px`,
            'position': 'fixed',
            'display': display? 'inline' : 'none'
        };
        return (
            <Tooltip style={tooltipStyle} placement="top" className="in" id="tooltip-top">
                {hoverElapsed}
            </Tooltip>
        );
    }
}

ProgressTooltip.propTypes = {
    display: PropTypes.bool.isRequired,
    hoverElapsed: PropTypes.number.isRequired,
    mouseX: PropTypes.number,
    progressBar: PropTypes.object
};

export default ProgressTooltip;