/**
 * Created by cqian19 on 6/5/2017.
 */

import { connect } from 'react-redux';

import PlaylistSidebar from '../components/PlaylistSidebar';
import { onSidebarToggle, getSidebarToggled } from '../core/sidebar';

const mapStateToProps = (state) => ({
    toggled: getSidebarToggled(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSidebarToggle() {
        dispatch(onSidebarToggle());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistSidebar);