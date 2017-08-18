/**
 * Created by cqian19 on 5/29/2017.
 */

import { connect } from 'react-redux';

import ResizableVideo from '../components/ResizableVideo';
import { getPlaylistCollapsed } from '../core/playlist';
import { saveVideoSize, getVideoHeight, getVideoWidth, togglePlaylistCollapse } from '../core/videoplayer';

const mapStateToProps = (state) => ({
    playlistCollapsed: getPlaylistCollapsed(state),
    height: getVideoHeight(state),
    width: getVideoWidth(state)
});

const mapDispatchToProps = (dispatch) => ({
    onResize: (size) => {
        dispatch(saveVideoSize(size));
    },
    onDismount: (size) => {
        dispatch(saveVideoSize(size));
    },
    onTogglePlaylistCollapse(collapse) {
        dispatch(togglePlaylistCollapse(collapse));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResizableVideo);