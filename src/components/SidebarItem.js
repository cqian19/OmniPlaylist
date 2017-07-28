/**
 * Created by cqian19 on 6/6/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InlineEdit from 'react-edit-inline';

import ReorderablePlaylistItemContainer from '../containers/ReorderablePlaylistItemContainer';

class SidebarItem extends React.Component {

    _generateHeader() {
        const { onPlaylistNameChange, playlist, onPlaylistRemove } = this.props;
        return (
            <div>
                <span className="playlist-remove" onClick={onPlaylistRemove}>
                    <i className="glyphicon glyphicon-remove" />
                 </span>
                <div className="sidebar-item__title">
                    <InlineEdit
                        className="renamable"
                        activeClassName="renamable-selected"
                        text={playlist.name}
                        paramName="playlistName"
                        change={onPlaylistNameChange}
                        stopPropagation={true}
                    />
                </div>
            </div>
        );
    }

    _generateBody = () => {
        const { playlist } = this.props;
        return (
            <div>
                <div className="sidebar-item__thumbnails">
                    {this._generateThumbnails(playlist)}
                </div>
            </div>
        );
    };


    _generateThumbnails(playlist) {
        const topVideos = playlist.videos.slice(0, 5); // Display top 5 thumbnails
        const thumbnails = topVideos.map((video) => video.thumbnail);
        return thumbnails.map((thumbnail) => (
            <span className="sidebar-mini-thumbnail">
                <img src={thumbnail} />
            </span>
        ));
    }

    render() {
        const { playlist } = this.props;
        return(
            <ReorderablePlaylistItemContainer
                {...this.props}
                header={this._generateHeader()}
                body={this._generateBody()}
            />
        )
    }
}

SidebarItem.propTypes = {
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onPlaylistNameChange: PropTypes.func.isRequired,
    onPlaylistRemove: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    playlistIndex:  PropTypes.number.isRequired
};

export default SidebarItem;