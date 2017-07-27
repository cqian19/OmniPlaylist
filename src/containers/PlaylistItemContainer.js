/**
 * Created by cqian19 on 7/11/2017.
 */

import { connect } from 'react-redux';

import PlaylistItem from '../components/PlaylistItem';
import { onPlaylistNameChange, onPlaylistRemove } from '../core/playlist';

/*
    ownProps:
        @param playlist - Playlist object this item contains
        @param playlistIndex - Index of playlist object in playlists
*/
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlaylistNameChange({playlistName}) {
        dispatch(onPlaylistNameChange(playlistName, ownProps.playlistIndex))
    },
    onPlaylistRemove() {
        dispatch(onPlaylistRemove(ownProps.playlistIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
