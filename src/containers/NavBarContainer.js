/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import { NAVS } from '../core/constants';
import { getNavs } from '../core/navbar';

const mapStateToProps = (state) => ({
    navs: getNavs(state)
});

const mapDispatchToProps = (dispatch) => ({
    onClick: () => {},
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)