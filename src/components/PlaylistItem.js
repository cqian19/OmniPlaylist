/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PlaylistItem extends React.Component {

    render() {
        const playlistItemNames = classNames({
            'playlist-item': true,
            'active': this.props.active
        });
        const { playlist } = this.props;
        return (
            <div className={playlistItemNames}>
                <img className="thumbnail thumbnail-mini" src={playlist.thumbnail}/>

                <div className="playlist-item__desc content">
                    <div className="playlist-item__title title">
                        {playlist.name}
                    </div>
                    <span className="playlist-remove" onClick={this.props.onPlaylistRemove}>
                        <i className="glyphicon glyphicon-remove" />
                    </span>
                </div>
            </div>
        );
    }
}

PlaylistItem.propTypes = {
    active: PropTypes.bool,
    onPlaylistRemove: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    playlistIndex: PropTypes.number.isRequired
};

export default PlaylistItem;