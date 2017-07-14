/**
 * Created by cqian19 on 6/6/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InlineEdit from 'react-edit-inline';

class SidebarItem extends React.Component {

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
        const sidebarItemNames = classNames({
            'sidebar-item': true,
            'active': this.props.active
        });
        return(
            <div className={sidebarItemNames} onClick={this.props.onItemClick}>
                <span className="playlist-remove" onClick={this.props.onPlaylistRemove}>
                    <i className="glyphicon glyphicon-remove" />
                </span>
                <div className="sidebar-item__title">
                    <InlineEdit
                        className="renamable"
                        activeClassName="renamable-selected"
                        text={playlist.name}
                        paramName="playlistName"
                        change={this.props.onPlaylistNameChange}
                        stopPropagation={true}
                    />
                </div>
                <div className="sidebar-item__thumbnails">
                    {this._generateThumbnails(playlist)}
                </div>
            </div>
        )
    }
}

SidebarItem.propTypes = {
    active: PropTypes.bool.isRequired,
    index:  PropTypes.number.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onPlaylistNameChange: PropTypes.func.isRequired,
    onPlaylistRemove: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired
};

export default SidebarItem;