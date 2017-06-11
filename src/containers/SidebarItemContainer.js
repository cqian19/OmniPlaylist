/**
 * Created by cqian19 on 6/7/2017.
 */

import { connect } from 'react-redux';

import SidebarItem from '../components/SidebarItem';
import { getPlaylistIndex, onPlaylistNameChange } from '../core/playlist';
import { onSidebarItemClick } from '../core/sidebar';

const mapStateToProps = (state, ownProps) => ({
    playlist: ownProps.playlist,
    index: ownProps.index,
    active: getPlaylistIndex(state) === ownProps.index
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onItemClick() {
        dispatch(onSidebarItemClick(ownProps.index));
    },
    onPlaylistNameChange({playlistName}) {
        dispatch(onPlaylistNameChange(playlistName, ownProps.index))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);