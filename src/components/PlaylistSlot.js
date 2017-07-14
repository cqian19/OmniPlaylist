/**
 * Created by cqian19 on 7/12/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import PlaylistItemContainer from '../containers/PlaylistItemContainer';

class PlaylistSlot extends React.Component {

    render() {
        const { playlist, focusDropdown } = this.props;
        return (
            <button type="button" id="playlist-slot" className="btn btn-basic" onClick={focusDropdown}>
                {playlist ? (
                    <PlaylistItemContainer playlist={playlist}/>
                ) : (
                    <div>No playlist selected</div>
                )}
            </button>
        );
    }
}

PlaylistSlot.propTypes = {
    playlist: PropTypes.object,
    focusDropdown: PropTypes.func.isRequired
};

export default PlaylistSlot;

