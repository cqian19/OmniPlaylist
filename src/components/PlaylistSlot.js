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
            <button type="button" id="playlist-slot" className="btn btn-basic" onClick={focusDropdown}>
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
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlistIndex: PropTypes.number.isRequired,
    focusDropdown: PropTypes.func.isRequired
};

export default PlaylistSlot;

