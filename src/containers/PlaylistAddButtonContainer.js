/**
 * Created by cqian19 on 7/24/2017.
 */

import { connect } from 'react-redux';
import { onPlaylistMake } from '../core/playlist';

import PlaylistAddButton from '../components/PlaylistAddButton';

/*
* ownProps:
*   @param swapPlay - Whether adding the new playlist will swap with the currently playing playlist
*   @param select - Whether adding the new playlist will swap with the selected playlist on the selected page
*/
const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
        dispatch(onPlaylistMake(ownProps.swapPlay, ownProps.select));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistAddButton);