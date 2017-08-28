/**
 * Created by cqian19 on 7/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import PlaylistItemContainer from '../containers/PlaylistItemContainer';

class PlaylistSlot extends React.Component {

    render() {
        const { playlists, playlistIndex, playlistValid, focusDropdown } = this.props;
        const playlist = playlists[playlistIndex];
        return (
            <button type="button" className="playlist-slot btn btn-basic" onClick={focusDropdown}>
                {playlistValid ? (
                    <PlaylistItemContainer
                        playlist={playlist}
                        playlistIndex={playlistIndex}
                    />
                ) : (
                    <div>No playlist selected</div>
                )}
            </button>
        );
    }
}

PlaylistSlot.propTypes = {
    focusDropdown: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlistIndex: PropTypes.number.isRequired,
    playlistValid: PropTypes.bool.isRequired
};

export default PlaylistSlot;

