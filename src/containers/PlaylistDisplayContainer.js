/**
 * Created by cqian19 on 7/14/2017.
 */
import { connect } from 'react-redux';

import PlaylistDisplay from '../components/PlaylistDisplay';
import { getPlaylists } from '../core/playlist';
import { getSelectedPlaylistIndex } from '../core/playlistselector';

const mapStateToProps = (state) => ({
    playlists: getPlaylists(state),
    playlistIndex: getSelectedPlaylistIndex(state)
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDisplay);