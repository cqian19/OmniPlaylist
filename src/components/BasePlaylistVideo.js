/**
 * Created by cqian19 on 7/15/2017.
 */

/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

/* From the react-dnd tutorial: https://github.com/react-dnd/react-dnd/tree/master/examples */
const videoSource = {
    beginDrag(props) {
        return {
            index: props.index,
            original_index: props.index,
            playlistIndex: props.playlistIndex
        };
    },
    endDrag(props, monitor) {
        /* If the video was dragged outside, restore its original position */
        const { index, original_index } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.onVideoMove(index, original_index, props.playlistIndex);
        }
    }
};

const videoTarget = {
    hover(props, monitor, component) {
        const draggingElement = monitor.getItem();
        const otherIndex = draggingElement.index; // Index of component being dragged
        const ourIndex = props.index; // Index of this component when it is hovered of
        const playlistIndex = props.playlistIndex;
        // Don't replace items with themselves
        if (ourIndex === otherIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 25%
        // When dragging upwards, only move when the cursor is above 75%

        // Dragging downwards
        if (ourIndex > otherIndex && hoverClientY < hoverMiddleY / 2) {
            return;
        }

        // Dragging upwards
        if (ourIndex < otherIndex && hoverClientY > hoverMiddleY * 1.5) {
            return;
        }

        // Time to actually perform the action
        props.onVideoMove(otherIndex, ourIndex, playlistIndex);

        // Dragging item index changes
        draggingElement.index = ourIndex;
        // Highlight the video at the target index (which is now this video)
        component.setState({isDragging: true});
    },
};

function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function target(connect) {
    return {
        dropTarget: connect.dropTarget()
    }
}

class BasePlaylistVideo extends React.Component {

    render() {
        const { body, className, video } = this.props;
        const playlistVideoNames = classNames({
            'playlist-video': true,
            'active': this.props.active,
            'dragging': this.props.isDragging
        });
        return this.props.dropTarget(this.props.dragSource(
            <div className={playlistVideoNames} onClick={this.props.onVideoClick}>
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                <div className="playlist-video__desc content">
                    <div className="playlist-video__title">
                        {video.title}
                    </div>
                    { body }
                </div>
            </div>
        ))
    }
}

BasePlaylistVideo.propTypes = {
    active: PropTypes.bool,
    body:   PropTypes.object,
    className: PropTypes.object,
    index:  PropTypes.number.isRequired,
    key:    PropTypes.number.isRequired,
    playlistIndex: PropTypes.number.isRequired,
    onVideoMove: PropTypes.func.isRequired,
    video:  PropTypes.object.isRequired
};

export default
DropTarget("PlaylistVideo", videoTarget, target)(
    DragSource("PlaylistVideo", videoSource, collect)(BasePlaylistVideo)
);