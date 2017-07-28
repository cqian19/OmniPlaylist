/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InlineEdit from 'react-edit-inline';

import BasePlaylistItem from './BasePlaylistItem';
import { confirmAlert } from './Confirm';

class PlaylistItem extends React.Component {

    _generateHeader() {
        const { onPlaylistNameChange, playlist } = this.props;
        return (
            <div>
                <img className="thumbnail thumbnail-mini" src={playlist.thumbnail}/>
                <InlineEdit
                    className="renamable"
                    activeClassName="renamable-selected"
                    text={playlist.name}
                    paramName="playlistName"
                    change={this.props.onPlaylistNameChange}
                    stopPropagation={true}
                />
            </div>
        );
    }

    _generateBody() {
        return (
            <span className="playlist-remove" onClick={this.handleRemove}>
                <i className="glyphicon glyphicon-remove" />
            </span>
        );
    }

    handleRemove = (event) => {
        event.stopPropagation();
        confirmAlert({
            message: 'Do you want to delete this playlist?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: this.props.onPlaylistRemove
        });
    };

    render() {
        return (
            <BasePlaylistItem
                {...this.props}
                body={this._generateBody()}
                header={this._generateHeader()}
            />
        );
    }
}

PlaylistItem.propTypes = {
    active: PropTypes.bool,
    onPlaylistNameChange: PropTypes.func.isRequired,
    onPlaylistRemove: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    playlistIndex: PropTypes.number.isRequired
};

export default PlaylistItem;