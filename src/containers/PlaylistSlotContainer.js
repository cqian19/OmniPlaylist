/**
 * Created by cqian19 on 7/13/2017.
 */

import { connect } from 'react-redux';

import PlaylistSlot from '../components/PlaylistSlot';
import { getSelectedPlaylist } from '../core/playlistselector';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    playlist: getSelectedPlaylist(state)
});

const mapDispatchToProps = (dispatch) => ({
    onClick: () => {}
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSlot);