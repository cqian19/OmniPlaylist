/**
 * Created by cqian19 on 7/14/2017.
 */

import { connect } from 'react-redux';

import SearchedVideo from '../components/SearchedVideo';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchedVideo);