/**
 * Created by cqian19 on 7/13/2017.
 */

import { connect } from 'react-redux';

import PlaylistSlot from '../components/PlaylistSlot';
import { getPlaylists } from '../core/playlist';
import { getSelectedPlaylistIndex, getPlaylistValid } from '../core/playlistselector';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    playlists: getPlaylists(state),
    playlistIndex: getSelectedPlaylistIndex(state),
    playlistValid: getPlaylistValid(state)
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSlot);