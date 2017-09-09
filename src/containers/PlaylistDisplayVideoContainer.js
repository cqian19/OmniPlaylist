/**
 * Created by cqian19 on 7/16/2017.
 */

/**
 * @file
 * Contains playlist videos from the selected playlist on the playlist tab
 */
import { connect } from 'react-redux';

import PlaylistVideo from '../components/PlaylistVideo';
import {
    onVideoAdd,
    onVideoMove,
    onVideoRemove,
    onVideoUpClick,
    onVideoDownClick
} from '../core/playlist';

/*
    ownProps:
        @param index: Index of video in playlist
        @param playlistIndex: Index of playlist this video belongs to
        @param video: Video this contains
 */
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onVideoClick(event) {},
    onVideoUpClick(event) {
        event.stopPropagation();
        dispatch(onVideoUpClick(ownProps.index, ownProps.playlistIndex));
    },
    onVideoDownClick(event) {
        event.stopPropagation();
        dispatch(onVideoDownClick(ownProps.index, ownProps.playlistIndex));
    },
    onVideoAdd(video, index) {
        dispatch(onVideoAdd(video, index, ownProps.playlistIndex));
    },
    onVideoMove(startIndex, endIndex, playlistIndex) {
        dispatch(onVideoMove(startIndex, endIndex, playlistIndex));
    },
    onVideoRemove() {
        dispatch(onVideoRemove(ownProps.index, ownProps.playlistIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideo);