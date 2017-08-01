/**
 * Created by cqian19 on 6/7/2017.
 */

import { connect } from 'react-redux';

import SidebarItem from '../components/SidebarItem';
import { getPlaylistIndex, onPlaylistNameChange, onPlaylistRemove } from '../core/playlist';
import { onSidebarItemClick } from '../core/sidebar';

/*
    ownProps:
        @param playlist - Playlist item this contains
        @param playlistIndex - Index of playlist item in playlists
 */
const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    active: getPlaylistIndex(state) === ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onItemClick() {
        dispatch(onSidebarItemClick(ownProps.index));
    },
    onPlaylistNameChange({playlistName}) {
        dispatch(onPlaylistNameChange(playlistName, ownProps.index))
    },
    onPlaylistRemove() {
        dispatch(onPlaylistRemove(ownProps.index));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);