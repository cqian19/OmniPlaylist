/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';
import Player from '../components/Player';
import {
    getVideos,
    getIndex,
    getReload,
    onVideoEnd,
    onVideoPrev,
    onVideoSkip,
    onPlayerReload
} from '../core/playlist';


const mapStateToProps = function(state) {
    const videos = getVideos(state);
    const index =  getIndex(state);
    const reload = getReload(state);
    return {
        videos,
        index,
        reload,
        ...videos.length && {video: videos[index]}
    }
};

const mapDispatchToProps = (dispatch) => ({
    onEnded() {
        dispatch(onVideoEnd());
    },
    onPrev() {
        dispatch(onVideoPrev());
    },
    onSkip() {
        dispatch(onVideoSkip());
    },
    onPlayerReload() {
        dispatch(onPlayerReload());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
