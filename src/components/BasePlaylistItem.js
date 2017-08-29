/**
 * Created by cqian19 on 7/26/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isElectron from 'is-electron';

import { confirmAlert } from './Confirm';

class BasePlaylistItem extends React.Component {

    _generateHeader() {
        const { playlist } = this.props;
        return (
            <div>
                <img className="thumbnail thumbnail-mini" src={playlist.thumbnail}/>
                <div className="playlist-item__title title">
                    {playlist.name}
                </div>
            </div>
        );
    }

    render() {
        const {
            active,
            body,
            className,
            header,
            onItemClick,
            playlist,
        } = this.props;
        const playlistItemNames = classNames({
            'playlist-item': !isElectron(),
            'playlist-item-mini': isElectron(),
            'active': active
        });
        return (
            <div className={className || playlistItemNames} onClick={onItemClick}>
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
    className: PropTypes.object,
    header: PropTypes.object,
    onItemClick: PropTypes.func,
    playlist: PropTypes.object.isRequired,
};

export default BasePlaylistItem;