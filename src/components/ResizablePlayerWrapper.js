/**
 * Created by cqian19 on 5/29/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ResizableBox } from 'react-resizable';

class ResizablePlayerWrapper extends React.Component {

    constructor(props) {
        super(props);
        // Inner variables store the user's set size of the Resizable
        // allowing for the component to grow back to that size when browser is resized
        this.state = {
            height: props.height,
            innerHeight: props.height,
            width: props.width,
            innerWidth: props.width
        };
    }

    _setupResize() {
        window.addEventListener('resize', this._doWindowResize);
    }

    _undoResize() {
        window.removeEventListener('resize', this._doWindowResize);
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
        if (!playlistCollapsed && spaceBetween < 420) {
            onTogglePlaylistCollapse(true);
        // Move playlist beside player
        } else if (playlistCollapsed && spaceBetween > 425) {
            onTogglePlaylistCollapse(false);
        }
    };

    _onInnerResize = (_, data) => {
        const { width, height } = data.size;
        this._checkCollapse(width);
        this.setState({
            height,
            innerHeight: height,
            width,
            innerWidth: width
        });
    };

    /* Resizes player if its bigger than the browser window */
    _doWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Grow the player back up to the base width/height
        if (this.state.width > width || width <= this.state.innerWidth) {
            this.setState({width});
        }
        if (this.state.height > height || height <= this.state.innerHeight) {
            this.setState({height});
        }
    };

    componentDidMount() {
        this._setupResize();
    }

    componentWillUnmount() {
        this._undoResize();
        // Save the video player's size
        this.props.onDismount({
            width: this.state.width,
            height: this.state.height
        });
    }

    render() {
        const { width, height } = this.state;
        const { children } = this.props;
        return(
            <div className="resizable-wrapper">
                <ResizableBox
                    axis={'both'}
                    className="resizable-video-container"
                    height={height}
                    width={width}
                    minConstraints={[150, 150]}
                    onResize={this._onInnerResize}
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
    onDismount: PropTypes.func.isRequired,
    onResize:   PropTypes.func.isRequired,
    onTogglePlaylistCollapse: PropTypes.func.isRequired,
    playlistCollapsed: PropTypes.bool.isRequired,
    width:  PropTypes.number.isRequired
};

export default ResizablePlayerWrapper