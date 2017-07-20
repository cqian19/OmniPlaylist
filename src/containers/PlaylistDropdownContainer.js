/**
 * Created by cqian19 on 7/11/2017.
 */

import { connect } from 'react-redux';

import PlaylistDropdown from '../components/PlaylistDropdown';
import { getPlaylists } from '../core/playlist';
import { onPlaylistSelectedChange } from '../core/playlistselector';

const mapStateToProps = (state) => ({
    playlists: getPlaylists(state)
});

const mapDispatchToProps = (dispatch) => ({
    onPlaylistChange: (playlist, playlistIndex) => {
        dispatch(onPlaylistSelectedChange(playlist, playlistIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDropdown);