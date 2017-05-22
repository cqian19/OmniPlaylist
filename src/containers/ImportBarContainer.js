/**
 * Created by cqian19 on 5/21/2017.
 */

import { connect } from 'react-redux';
import { getError, linkFailed, importPlaylist } from '../core/importbar';
import ImportBar from '../components/ImportBar';

const mapStateToProps = (state) => ({
    error: getError(state)
});

const mapDispatchToProps = (dispatch) => ({

    handleImport: (link) => {
        dispatch();
    },
    linkFailed: () => {
        dispatch(linkFailed())
    }
});

export default connect(null, mapDispatchToProps)(ImportBar)