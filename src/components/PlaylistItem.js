/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InlineEdit from 'react-edit-inline';

import BasePlaylistItem from './BasePlaylistItem';
import RemoveButton from "./RemoveButton";

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
        const { onPlaylistRemove } = this.props;
        return (
            <RemoveButton onRemove={onPlaylistRemove} confirm={true} />
        );
    }

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