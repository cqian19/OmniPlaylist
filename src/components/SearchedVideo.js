/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isElectron from 'is-electron';
import { DragSource } from 'react-dnd';

import { DRAG_TYPES } from '../core/constants';

const videoSource = {
    beginDrag(props) {
        return {
            id: props.id,
            video: props.video
        };
    },
    isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
    },
    endDrag(props, monitor) {
        /* If the video was dragged outside, remove the video */
        const { index, playlistIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();
        if (!didDrop) {
            props.onVideoRemove(index, playlistIndex);
        }
    }
};

function collect(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class SearchedVideo extends React.Component {

    render() {
        const { dragSource, video } = this.props;
        const searchedVideoNames = {
          "searched-video": !isElectron(),
          "searched-video-mini": isElectron()
        };
        return dragSource(
            <div className="searched-video">
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                <div className="searched-video__title title" >
                    {video.title}
                </div>
            </div>
        );
    }
}

SearchedVideo.propTypes = {
    dragSource: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default DragSource(
    DRAG_TYPES.INSERTABLE_VIDEO, videoSource, collect
)(SearchedVideo);