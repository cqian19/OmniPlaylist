/**
 * Created by cqian19 on 7/26/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { confirmAlert } from './Confirm';

class BasePlaylistItem extends React.Component {

    _generateHeader() {
        const { playlist } = this.props;
        return (
            <div className="playlist-item__title title">
                {playlist.name}
            </div>
        );
    }

    render() {
        const {
            active,
            body,
            header,
            playlist,
        } = this.props;
        const playlistItemNames = classNames({
            'playlist-item': true,
            'active': active
        });
        return (
            <div className={playlistItemNames}>
                <img className="thumbnail thumbnail-mini" src={playlist.thumbnail}/>
                <div className="playlist-item__desc content">
                    { header || this._generateHeader()}
                    { body }
                </div>
            </div>
        );
    }
}

BasePlaylistItem.propTypes = {
    active: PropTypes.bool,
    body: PropTypes.object,
    header: PropTypes.object,
    playlist: PropTypes.object.isRequired,
};

export default BasePlaylistItem;