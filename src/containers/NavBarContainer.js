/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NavBar from '../components/NavBar';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));