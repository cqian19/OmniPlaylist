/**
 * Created by cqian19 on 7/11/2017.
 */

import { connect } from 'react-redux';

import PlaylistItem from '../components/PlaylistItem';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
    onItemClick: () => {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItem);
