/**
 * Created by cqian19 on 5/30/2017.
 */

import { connect } from 'react-redux';

import PlaylistVideo from '../components/PlaylistVideo';
import {
    onVideoAdd,
    onVideoClick,
    onVideoUpClick,
    onVideoDownClick,
    onVideoMove,
    onVideoRemove,
    getIndex,
    getPlaylistIndex
} from '../core/playlist';

const mapStateToProps = (state, ownProps) => ({
    active: getIndex(state) === ownProps.index,
    index: ownProps.index,
    playlistIndex: ownProps.playlistIndex,
    video: ownProps.video,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onVideoClick(event) {
        dispatch(onVideoClick(ownProps.index));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideo)