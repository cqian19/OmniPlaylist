/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { DRAG_TYPES } from '../core/constants';
import PlaylistDisplayVideoContainer from '../containers/PlaylistDisplayVideoContainer';

const playlistTarget = {

    hover(props, monitor, component) {
        const { onVideoAdd, playlists, playlistIndex } = props;
        if (!playlists.length || !playlists[playlistIndex]) {
            return;
        }
        const playlist = playlists[playlistIndex];
        const searchedVideo = monitor.getItem();
        if (searchedVideo.index === undefined) {
            const lastIndex = playlist.videos.length;
            // Insert video to the end of the playlist
            props.onVideoAdd(searchedVideo.video, lastIndex, playlistIndex);
            searchedVideo.index = lastIndex;
            searchedVideo.playlistIndex = playlistIndex;
        }
    },
};

function target(connect) {
    return {
        dropTarget: connect.dropTarget()
    }
}

class PlaylistDisplay extends React.Component {

    render() {
        const { playlists, playlistIndex, dropTarget } = this.props;
        const playlist = playlists[playlistIndex];
        return dropTarget(
            <div className='playlist-display'>
                {playlist ? (
                    playlist.videos.length ? (
                        playlist.videos.map((video,index) => {
                            return (
                                <PlaylistDisplayVideoContainer
                                    key={video.uniqueId}
                                    index={index}
                                    playlistIndex={playlistIndex}
                                    video={video}
                                />
                            )
                        })
                    ) : (
                        <div className="playlist-display-placeholder centered-text">Drag videos here</div>
                    )
                ) : (
                    <div className="playlist-display-placeholder centered-text">Playlist videos will appear here</div>
                )}
            </div>
        );
    }
}

PlaylistDisplay.propTypes = {
    dropTarget: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object),
    playlistIndex: PropTypes.number.isRequired
};

export default DropTarget(
    DRAG_TYPES.INSERTABLE_VIDEO, playlistTarget, target
)(PlaylistDisplay);