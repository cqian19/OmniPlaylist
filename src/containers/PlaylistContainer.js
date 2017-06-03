/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';

import {
    getIndex,
    getVideos
} from '../core/playlist';
import Playlist from '../components/Playlist';

const mapStateToProps = (state) => ({
    videos: getVideos(state),
    index: getIndex(state)
});

export default connect(mapStateToProps)(Playlist);