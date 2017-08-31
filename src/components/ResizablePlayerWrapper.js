/**
 * Created by cqian19 on 5/29/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ResizableBox } from 'react-resizable';
import { findDOMNode } from 'react-dom';

import {
    BASE_VIDEO_HEIGHT,
    BASE_VIDEO_WIDTH,
    VIDEO_MIN_HEIGHT,
    VIDEO_MIN_WIDTH
} from '../core/constants';

const MARGIN = 3; // Margin around player
const MENU_BAR_SPACE = 60; // Space for buttons

class ResizablePlayerWrapper extends React.Component {

    constructor(props) {
        super(props);
        // Height and width store the player's width and height, not including the menu bar
        // Inner variables store the user's set size of the Resizable
        // allowing for the component to grow back to that size when browser is resized
        this.state = {
            height: props.height,
            innerHeight: props.height,
            width: props.width,
            innerWidth: props.width
        };
        this.saved = {
            marginLeft: 0,
            marginTop: 0
        }
    }

    _setupResize() {
        window.addEventListener('resize', this._doWindowResize);
    }

    _undoResize() {
        window.removeEventListener('resize', this._doWindowResize);
    }

    _getResizeBounds() {
        return findDOMNode(this.resizable).getBoundingClientRect();
    }

    /**
     * @description Checks whether the playlist should snap to the side or bottom of the player
     * @private
     * @param playerWidth - Width of the resizable container
     */
    _checkCollapse = (playerWidth) => {
        const { onTogglePlaylistCollapse, playlistCollapsed } = this.props;
        const windowWidth = window.innerWidth;
        const spaceBetween = windowWidth - playerWidth;
        // Snap playlist to bottom of player
        if (!playlistCollapsed && spaceBetween < 400) {
            onTogglePlaylistCollapse(true);
        // Move playlist beside player
        } else if (playlistCollapsed && spaceBetween > 405) {
            onTogglePlaylistCollapse(false);
        }
    };

    _generateConservativeConstraints = () => {
        const windowWidth  = window.innerWidth;
        const windowHeight = window.innerHeight;
        const  { marginTop, marginLeft } = this.saved;
        return ([windowWidth - 2 * marginLeft, windowHeight - MENU_BAR_SPACE - marginTop]);
    };

    _generateMaxConstraints = () => {
        if (!this.resizable) {
            return [Infinity, Infinity];
        }
        const rectangle = this._getResizeBounds();
        const windowWidth  = window.innerWidth;
        const windowHeight = window.innerHeight;
        const marginTop    = rectangle.top;
        const marginLeft   = rectangle.left;
        return ([windowWidth - 2 * marginLeft, windowHeight - MENU_BAR_SPACE - marginTop]);
    };

    _onInnerResize = (_, data) => {
        const { width, height } = data.size;
        this.setState({
            height,
            innerHeight: height,
            width,
            innerWidth: width
        });
    };

    /* Resizes player if its bigger than the browser window */
    _doWindowResize = () => {
        const { hideExtra } = this.props;
        if (hideExtra) {
            this.forceUpdate();
        } else {
            const rectangle  = this._getResizeBounds();
            const leftMargin = rectangle.left;
            const topMargin  = rectangle.top;
            const width      = window.innerWidth;
            const height     = window.innerHeight;
            // Grow the player back up to the base width/height
            // Handle width shrinking/growing while leaving margin
            if (this.state.width > width || width <= this.state.innerWidth) {
                this.setState({width: width -  2 * leftMargin});
            }
            // Handle height shrinking/growing while leaving margin
            if (topMargin + MARGIN + this.state.height > height || topMargin + MARGIN + height <= this.state.innerHeight) {
                this.setState({height: height - topMargin - MARGIN});
            }
        }
    };

    componentDidMount() {
        const { width } = this.state;
        this._setupResize();
        this._checkCollapse(width);
        const rectangle = this._getResizeBounds();
        this.saved = {
            marginLeft: rectangle.left,
            marginTop: rectangle.top
        };
    }

    componentDidUpdate(prevProps) {
        const { hideExtra } = this.props;
        const { height, width } = this.state;
        this._checkCollapse(width);
        const oldHideExtra = prevProps.hideExtra;
        // Make player fit after exiting from full screen
        if (!hideExtra && oldHideExtra) {
            const [ maxWidth, maxHeight ] = this._generateMaxConstraints();
            this.setState({
                height: Math.min(height, maxHeight),
                width: Math.min(width, maxWidth)
            });
        }
    }

    componentWillUnmount() {
        const { saveSize } = this.props;
        const { width, height } = this.state;
        this._undoResize();
        // Save the video player's size
        saveSize({width, height});
    }

    render() {
        let { width, height } = this.state;
        const { children, hideExtra } = this.props;
        const resizeClassNames = classNames({
            'resizable-video-container': true,
            'resizable-video-container-full': hideExtra
        });
        // Fullscreen
        if (hideExtra) {
            height = window.innerHeight - 30; //  Subtract top bar height
            width = window.innerWidth ;
        }
        return(
            <div className="resizable-wrapper">
                <ResizableBox
                    axis={'both'}
                    className={resizeClassNames}
                    height={height}
                    width={width}
                    minConstraints={[VIDEO_MIN_WIDTH, VIDEO_MIN_HEIGHT]}
                    maxConstraints={this._generateMaxConstraints()}
                    onResize={this._onInnerResize}
                    ref={(e) => { this.resizable = e; }}
                >
                    {children}
                </ResizableBox>
            </div>
        );
    }
}

ResizablePlayerWrapper.propTypes = {
    children: PropTypes.object,
    height: PropTypes.number.isRequired,
    hideExtra: PropTypes.bool.isRequired,
    onTogglePlaylistCollapse: PropTypes.func.isRequired,
    playlistCollapsed: PropTypes.bool.isRequired,
    saveSize: PropTypes.func.isRequired,
    width:  PropTypes.number.isRequired
};

export default ResizablePlayerWrapper;