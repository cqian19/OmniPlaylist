/**
 * Created by cqian19 on 5/29/2017.
 */

import { connect } from 'react-redux';

import ResizableVideo from '../components/ResizablePlayerWrapper';
import { getHideExtra } from '../core/app';
import { getPlaylistCollapsed } from '../core/playlist';
import {
    saveVideoSize,
    getVideoHeight,
    getVideoWidth,
    togglePlaylistCollapse
} from '../core/videoplayer';

const mapStateToProps = (state) => ({
    hideExtra: getHideExtra(state),
    playlistCollapsed: getPlaylistCollapsed(state),
    height: getVideoHeight(state),
    width: getVideoWidth(state)
});

const mapDispatchToProps = (dispatch) => ({
    saveSize: (size) => {
        dispatch(saveVideoSize(size));
    },
    onTogglePlaylistCollapse(collapse) {
        dispatch(togglePlaylistCollapse(collapse));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResizableVideo);