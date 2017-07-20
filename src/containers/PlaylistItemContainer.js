/**
 * Created by cqian19 on 7/11/2017.
 */

import { connect } from 'react-redux';

import PlaylistItem from '../components/PlaylistItem';
import { onPlaylistRemove } from '../core/playlist';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onPlaylistRemove(event) {
        event.stopPropagation();
        dispatch(onPlaylistRemove(ownProps.playlistIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
