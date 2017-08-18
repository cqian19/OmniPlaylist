/**
 * Created by cqian19 on 8/17/2017.
 */

import { connect } from 'react-redux';
import { getPlaylistCollapsed } from '../core/playlist';

import PlayerLowerPage from '../components/PlayerLowerPage';

const mapStateToProps = (state, ownProps) => ({
    playlistCollapsed: getPlaylistCollapsed(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerLowerPage);