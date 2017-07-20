/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import PlaylistDisplayVideoContainer from '../containers/PlaylistDisplayVideoContainer';

class PlaylistDisplay extends React.Component {

    render() {
        const { playlists, playlistIndex } = this.props;
        const playlist = playlists[playlistIndex];
        return (
            <div className='playlist-display'>
                {playlist ? (
                    playlist.videos.map((video,index) => {
                        return (
                            <PlaylistDisplayVideoContainer
                                index={index}
                                playlistIndex={playlistIndex}
                                video={video}
                        />
                        )
                    })
                ) : (
                    <div>No playlist selected</div>
                )}
            </div>
        );
    }
}

PlaylistDisplay.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object),
    playlistIndex: PropTypes.number.isRequired
};

export default PlaylistDisplay;