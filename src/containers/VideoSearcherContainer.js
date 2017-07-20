/**
 * Created by cqian19 on 7/14/2017.
 */

import { connect } from 'react-redux';

import VideoSearcher from '../components/VideoSearcher';
import { getPlaylists } from '../core/playlist';

const mapStateToProps = (state) => ({
    playlists: getPlaylists(state)
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(VideoSearcher);