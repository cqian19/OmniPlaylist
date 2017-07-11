/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';

import App from '../components/App';
import { APP_LOAD } from '../core/constants';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => {
        dispatch({ type: APP_LOAD })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);