/**
 * Created by cqian19 on 6/5/2017.
 */

import { connect } from 'react-redux';

import SidebarPlaylist from '../components/SidebarPlaylist';
import { getPlaylists } from '../core/playlist';
import { onSidebarToggle, getSidebarToggled } from '../core/sidebar';

const mapStateToProps = (state, ownProps) => ({
    toggled: getSidebarToggled(state),
    playlists: getPlaylists(state),
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
    onSidebarToggle() {
        dispatch(onSidebarToggle());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPlaylist);