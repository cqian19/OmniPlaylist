/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';

import { getHideExtra } from '../core/app';
import {
    getIndex,
    getVideos,
    getPlaylistIndex
} from '../core/playlist';
import {
    getVideoWidth,
    getVideoHeight
} from '../core/videoplayer';
import Playlist from '../components/Playlist';

const mapStateToProps = (state, ownProps) => ({
    // playerHeight: getVideoHeight(state),
    // playerWidth: getVideoWidth(state),
    videos: getVideos(state),
    index: getIndex(state),
    playlistIndex: getPlaylistIndex(state),
    hideExtra: getHideExtra(state)
});

export default connect(mapStateToProps)(Playlist);