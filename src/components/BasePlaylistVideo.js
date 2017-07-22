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

import { DRAG_TYPES } from '../core/constants';

/* From the react-dnd tutorial: https://github.com/react-dnd/react-dnd/tree/master/examples */
const videoSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            originalIndex: props.index,
            playlistIndex: props.playlistIndex,
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },
    endDrag(props, monitor) {
        /* If the video was dragged outside, restore its original position */
        const { index, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.onVideoMove(index, originalIndex, props.playlistIndex);
        }
    }
};

const videoTarget = {

    hover(props, monitor, component) {
        const draggingElementType = monitor.getItemType();
        switch (draggingElementType) {
            case DRAG_TYPES.PLAYLIST_VIDEO:
                handlePlaylistVideoHover(props, monitor, component);
                break;
            case DRAG_TYPES.INSERTABLE_VIDEO:
                handleInsertableVideoHover(props, monitor, component);
                break;
            default:
                return;

        }
    },
};

function shouldSwap(ourIndex, draggedIndex, hoverClientY, hoverMiddleY) {
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 25%
    // When dragging upwards, only move when the cursor is above 75%
    // Dragging downwards
    return (ourIndex > draggedIndex && hoverClientY > hoverMiddleY / 2 ||
            ourIndex < draggedIndex && hoverClientY < hoverMiddleY * 1.5);
}

function handlePlaylistVideoHover(props, monitor, component) {
    const draggingElement = monitor.getItem(),
          otherIndex = draggingElement.index, // Index of component being dragged
          ourIndex = props.index, // Index of this component when it is hovered of
          playlistIndex = props.playlistIndex;
    // Don't replace items with themselves
    if (ourIndex === otherIndex) {
        return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (!shouldSwap) {
        return;
    }
    // Time to actually perform the action
    props.onVideoMove(otherIndex, ourIndex, playlistIndex);

    // Dragging item index changes
    draggingElement.index = ourIndex;
}

function handleInsertableVideoHover(props, monitor, component) {
    const draggingElement = monitor.getItem();
    // Check if video is already in the playlist

    const ourIndex = props.index;
    const playlistIndex = props.playlistIndex;

    if (ourIndex === draggingElement.index) {
        component.setState({isDragging: true});
        return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(),
          hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2,
          clientOffset = monitor.getClientOffset(),
          hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (draggingElement.index !== undefined) {
        if (shouldSwap(ourIndex, draggingElement.index, hoverClientY, hoverMiddleY)) {
            component.setState({isDragging: true});
        }
        return handlePlaylistVideoHover(props, monitor, component);
    }
    // Insert dragged video before this video, otherwise insert after
    const toInsertIndex = hoverClientY < hoverMiddleY ? ourIndex : ourIndex + 1;
    props.onVideoAdd(draggingElement.video, toInsertIndex);
    draggingElement.index = toInsertIndex;
    draggingElement.playlistIndex = playlistIndex;
}

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
    id:    PropTypes.string.isRequired,
    playlistIndex: PropTypes.number.isRequired,
    onVideoMove: PropTypes.func.isRequired,
    video:  PropTypes.object.isRequired
};

export default
DropTarget([DRAG_TYPES.PLAYLIST_VIDEO, DRAG_TYPES.INSERTABLE_VIDEO], videoTarget, target)(
    DragSource(DRAG_TYPES.PLAYLIST_VIDEO, videoSource, collect)(BasePlaylistVideo)
);