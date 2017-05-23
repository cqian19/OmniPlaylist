/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';
import {
    getError,
    getValidationState,
    getVideos,
    linkFailed,
    importPlaylist,
    resetForm
} from '../core/importbar';
import ImportBar from '../components/ImportBar';

const mapStateToProps = (state) => ({
    error: getError(state),
    validationState: getValidationState(state),
    videos: getVideos(state)
});

const mapDispatchToProps = (dispatch) => ({

    handleImport: (link) => {
        dispatch(importPlaylist(link));
    },

    linkFailed: () => {
        dispatch(linkFailed());
    },

    resetForm: () => {
        dispatch(resetForm());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ImportBar)