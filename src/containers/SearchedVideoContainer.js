/**
 * Created by cqian19 on 7/14/2017.
 */

import { connect } from 'react-redux';

import SearchedVideo from '../components/SearchedVideo';
import {
    onVideoRemove
} from '../core/playlist';

/* ownProps:
    @param video - Video this component contains
*/
const mapStateToProps = (state, ownProps) => ({
    id: ownProps.video.uniqueId,
    ...ownProps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onVideoRemove(index, playlistIndex) {
        dispatch(onVideoRemove(index, playlistIndex));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchedVideo);