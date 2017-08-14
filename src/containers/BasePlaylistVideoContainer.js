/**
 * Created by cqian19 on 7/15/2017.
 */

/**
 * Created by cqian19 on 5/30/2017.
 */

import { connect } from 'react-redux';

import BasePlaylistVideo from '../components/BasePlaylistVideo';
import { onVideoMove } from '../core/playlist';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    id: ownProps.video.uniqueId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
    mapStateToProps, mapDispatchToProps, null, { withRef: true }
)(BasePlaylistVideo);