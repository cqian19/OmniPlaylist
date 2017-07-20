/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { DragSource } from 'react-dnd';

const videoSource = {
    beginDrag(props) {
        return {
            playlist: props.video
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

class SearchedVideo extends React.Component {

    render() {
        const { connectDragSource, video } = this.props;
        return connectDragSource(
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
    connectDragSource: PropTypes.func.isRequired,
    video: PropTypes.object.isRequired
};

export default DragSource(
    "SearchedVideo", videoSource, collect
)(SearchedVideo);