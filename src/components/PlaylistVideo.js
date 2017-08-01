/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RemoveButton from './RemoveButton';
import BasePlaylistVideoContainer from '../containers/BasePlaylistVideoContainer';

class PlaylistVideo extends React.Component {

    _generateBody() {
        const { onVideoUpClick, onVideoDownClick, onVideoRemove } = this.props;
        return (
            <div className="playlist__buttons display-row">
                <span className="video-up btn icon-btn" onClick={onVideoUpClick}>
                    <i className="glyphicon glyphicon-arrow-up" />
                </span>
                <span className="video-down btn icon-btn" onClick={onVideoDownClick}>
                    <i className="glyphicon glyphicon-arrow-down" />
                </span>
                <RemoveButton onRemove={onVideoRemove} />
            </div>
        );
    }

    render() {
        const playlistVideoNames = classNames({
            'playlist-video': true,
            'active': this.props.active,
            'dragging': this.props.isDragging
        });
        const body = this._generateBody();
        return (
            <BasePlaylistVideoContainer {...this.props}
                body={body}
                className={playlistVideoNames}
            />
        )
    }
}

PlaylistVideo.propTypes = {
    active: PropTypes.bool.isRequired,
    index:  PropTypes.number.isRequired,
    onVideoAdd:       PropTypes.func,
    onVideoClick:     PropTypes.func,
    onVideoUpClick:   PropTypes.func.isRequired,
    onVideoDownClick: PropTypes.func.isRequired,
    onVideoMove:      PropTypes.func.isRequired,
    onVideoRemove:    PropTypes.func.isRequired,
    video:  PropTypes.object.isRequired
};

export default PlaylistVideo;