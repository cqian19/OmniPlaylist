/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';
import Player from '../components/Player';
import { getVideos, getIndex, onVideoEnd } from '../core/playlist';


const mapStateToProps = (state) => ({
    videos: getVideos(state),
    index: getVideos(state).length === 0 ? 0 : getIndex(state) % getVideos(state).length
});

const mapDispatchToProps = (dispatch) => ({
    onEnded: (curIndex) => {
        dispatch(onVideoEnd(curIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
