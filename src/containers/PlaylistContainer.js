/**
 * Created by cqian19 on 5/22/2017.
 */

import { connect } from 'react-redux';
import { getIndex, getVideos } from '../core/playlist';
import Playlist from '../components/Playlist';

const mapStateToProps = (state) => ({
    index: getIndex(state),
    videos: getVideos(state)
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);