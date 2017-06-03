/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';
import Player from '../components/Player';
import {
    getVideos,
    getIndex,
    onVideoEnd,
    onVideoPrev,
    onVideoSkip
} from '../core/playlist';


const mapStateToProps = function(state) {
    const videos = getVideos(state);
    const index = getIndex(state);
    return {videos, index, ...videos.length && {video: videos[index]}}
};

const mapDispatchToProps = (dispatch) => ({
    onEnded: () => {
        dispatch(onVideoEnd());
    },
    onPrev: () => {
        dispatch(onVideoPrev());
    },
    onSkip: () => {
        dispatch(onVideoSkip());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
