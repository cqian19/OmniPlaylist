/**
 * Created by cqian19 on 8/21/2017.
 */

import { connect } from 'react-redux';

import { onHideExtraToggle, getHideExtra } from '../core/app';
import TitleBar from '../components/TitleBar';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    hideExtra: getHideExtra(state)
});

const mapDispatchToProps = (dispatch) => ({
    onHideToggle() {
        dispatch(onHideExtraToggle());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TitleBar);