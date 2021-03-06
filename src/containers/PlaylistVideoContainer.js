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

/**
    @param ownProps.index - Index of element in video in playlist
    @param ownProps.playlistIndex - Index of playlist in playlists
    @param [ownProps.scrollTo] - Method for parent container to scroll to elem
    @param ownProps.video - Video object this contains
 */
const mapStateToProps = (state, ownProps) => ({
    active: getIndex(state) === ownProps.index,
    ...ownProps
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