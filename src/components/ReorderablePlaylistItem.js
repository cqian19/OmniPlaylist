/**
 * Created by cqian19 on 7/27/2017.
 */

/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isElectron from 'is-electron';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';

import BasePlaylistItem from './BasePlaylistItem';
import { confirmAlert } from './Confirm';
import { DRAG_TYPES } from '../core/constants';

const itemSource = {
    beginDrag(props) {
        return {
            index: props.index,
            originalIndex: props.index,
            playlistIndex: props.playlistIndex,
        };
    },
    endDrag(props, monitor) {
        /* If the video was dragged outside, restore its original position */
        const { index, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.onPlaylistMove(originalIndex);
        }
    }
};

const itemTarget = {
    hover(props, monitor, component) {
        handlePlaylistItemHover(props, monitor, component);
    }
};

function shouldSwap(ourIndex, draggedIndex, hoverClientY, hoverMiddleY) {
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 25%
    // When dragging upwards, only move when the cursor is above 75%
    // Dragging downwards
    return (ourIndex > draggedIndex && hoverClientY > hoverMiddleY / 2 ||
    ourIndex < draggedIndex && hoverClientY < hoverMiddleY * 1.5);
}

function handlePlaylistItemHover(props, monitor, component) {
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

    if (!shouldSwap(ourIndex, otherIndex, hoverClientY, hoverMiddleY)) {
        return;
    }
    // Time to actually perform the action
    props.onPlaylistMove(otherIndex, ourIndex, playlistIndex);

    // Dragging item index changes
    draggingElement.index = ourIndex;
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

class ReorderablePlaylistItem extends React.Component {

    render() {
        const {
            active,
            dropTarget,
            dragSource,
            isDragging
        } = this.props;
        const reorderableItemNames = classNames({
            'playlist-item': !isElectron(),
            'playlist-item-mini': isElectron(),
            'active': active,
            'dragging': isDragging
        });
        return dropTarget(dragSource(
            <div>
                <BasePlaylistItem
                    {...this.props}
                    className={reorderableItemNames}
                />
            </div>
        ));
    }
}

ReorderablePlaylistItem.propTypes = {
    active: PropTypes.bool,
    body: PropTypes.object,
    dragSource: PropTypes.func.isRequired,
    dropTarget: PropTypes.func.isRequired,
    header: PropTypes.object,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool,
    onPlaylistMove: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    playlistIndex: PropTypes.number.isRequired
};

export default DropTarget(DRAG_TYPES.PLAYLIST_ITEM, itemTarget, target)(
    DragSource(DRAG_TYPES.PLAYLIST_ITEM, itemSource, collect)(ReorderablePlaylistItem)
);