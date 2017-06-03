/**
 * Created by cqian19 on 5/29/2017.
 */

import { connect } from 'react-redux';
import { saveVideoSize, getVideoHeight, getVideoWidth } from '../core/videoplayer';
import ResizableVideo from '../components/ResizableVideo';

const mapStateToProps = (state) => ({
    height: getVideoHeight(state),
    width: getVideoWidth(state)
});

const mapDispatchToProps = (dispatch) => ({
    onDismount: (size) => {
        dispatch(saveVideoSize(size));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResizableVideo);