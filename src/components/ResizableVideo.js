/**
 * Created by cqian19 on 5/29/2017.
 */

import React from 'react';
import Resizable from 'react-resizable-box';

class ResizableVideo extends React.Component {

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

    _onInnerResize = (e,d, resizableElement) => {
        const height = resizableElement.offsetHeight;
        const width = resizableElement.offsetWidth;
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
        return(
            <div>
                <Resizable
                    width={this.state.width}
                    height={this.state.height}
                    onResize={this._onInnerResize}
                    className="resizable-video-container"
                >
                    {this.props.children}
                </Resizable>
            </div>
        );
    }
}

export default ResizableVideo