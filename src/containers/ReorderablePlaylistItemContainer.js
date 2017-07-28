/**
 * Created by cqian19 on 7/27/2017.
 */

import { connect } from 'react-redux';
import { onPlaylistMove } from '../core/playlist';
import ReorderablePlaylistItem from '../components/ReorderablePlaylistItem';
/*
    ownProps:
        @param playlist - Playlist item this contains
        @param playlistIndex - Index of playlist in playlists
 */
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlaylistMove(endIndex) {
        dispatch(onPlaylistMove(ownProps.playlistIndex, endIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReorderablePlaylistItem);
