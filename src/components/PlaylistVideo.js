/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

/* From the react-dnd tutorial: https://github.com/react-dnd/react-dnd/tree/master/examples */
const videoSource = {
    beginDrag(props) {
        return {
            index: props.index,
            original_index: props.index
        };
    },
    endDrag(props, monitor) {
        /* If the video was dragged outside, restore its original position */
        const { index, original_index } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.onVideoMove(index, original_index);
        }
    }
};

const videoTarget = {
    hover(props, monitor, component) {
        const draggingElement = monitor.getItem();
        const otherIndex = draggingElement.index; // Index of component being dragged
        const ourIndex = props.index; // Index of this component when it is hovered of
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
        props.onVideoMove(otherIndex, ourIndex);

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

class PlaylistVideo extends React.Component {

    render() {
        const video = this.props.video;
        return this.props.dropTarget(this.props.dragSource(
            <div className={
                            "playlist-video " +
                            (this.props.isDragging ? "dragging" : "") +
                            (this.props.active ? "active" : "")
                           }
                 onClick={this.props.onVideoClick}>
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                <div className="playlist-video-desc">
                    <div className="playlist-video-title">
                        {video.title}
                    </div>
                    <span className="video-up btn icon-btn" onClick={this.props.onVideoUpClick}>
                        <i className="glyphicon glyphicon-arrow-up" />
                    </span>
                    <span className="video-down btn icon-btn" onClick={this.props.onVideoDownClick}>
                        <i className="glyphicon glyphicon-arrow-down" />
                    </span>
                    <span className="video-remove" onClick={this.props.onVideoRemove}>
                        <i className="glyphicon glyphicon-remove" />
                    </span>
                </div>
            </div>
        ))
    }
}
export default
DropTarget("PlaylistVideo", videoTarget, target)(
    DragSource("PlaylistVideo", videoSource, collect)(PlaylistVideo)
);