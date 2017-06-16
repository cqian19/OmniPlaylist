/**
 * Created by cqian19 on 5/30/2017.
 */

import { connect } from 'react-redux';

import PlaylistVideo from '../components/PlaylistVideo';
import {
    onVideoClick,
    onVideoUpClick,
    onVideoDownClick,
    onVideoMove,
    onVideoRemove,
    getIndex
} from '../core/playlist';

const mapStateToProps = (state, ownProps) => ({
    active: getIndex(state) === ownProps.index,
    index: ownProps.index,
    key: ownProps.index,
    video: ownProps.video,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onVideoClick(event) {
        dispatch(onVideoClick(ownProps.index));
    },
    onVideoUpClick(event) {
        event.stopPropagation();
        dispatch(onVideoUpClick(ownProps.index, ownProps.index-1));
    },
    onVideoDownClick(event) {
        event.stopPropagation();
        dispatch(onVideoDownClick(ownProps.index, ownProps.index+1));
    },
    onVideoMove(startIndex, endIndex) {
        dispatch(onVideoMove(startIndex, endIndex));
    },
    onVideoRemove(event) {
        event.stopPropagation();
        dispatch(onVideoRemove(ownProps.index));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistVideo)