/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';
import {
    getError,
    getValidationState,
    doImport,
    resetForm
} from '../core/importbar';
import ImportBar from '../components/ImportBar';

const mapStateToProps = (state) => ({
    error: getError(state),
    validationState: getValidationState(state),
});

const mapDispatchToProps = (dispatch) => ({

    doImport: (link) => {
        dispatch(doImport(link));
    },

    resetForm: () => {
        dispatch(resetForm());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ImportBar)