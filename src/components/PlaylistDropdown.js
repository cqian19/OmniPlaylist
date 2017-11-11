/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, SplitButton } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';

import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistSlotContainer from '../containers/PlaylistSlotContainer';
import PlaylistAddButtonContainer from "../containers/PlaylistAddButtonContainer";
import BasePlaylistItem from "./BasePlaylistItem";


class PlaylistDropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            'value': ''
        }
    }
    /* Converts playlists into format readable by Typeahead */
    _convertPlaylistToDict(playlists) {
        return playlists.map((playlist, index) => ({
            name: playlist.name,
            playlist: playlist,
            index: index
        }));
    }

    _renderMenu(items, value) {
        return (
            <div className="playlist-dropdown-menu" children={items}/>
        )
    }
    handleFocus = () => {
        this.typeahead.clear();
    };

    handleItemChange = (playlistObj) => {
        if (playlistObj) {
            const { onPlaylistChange } = this.props;
            const { playlist, index } = playlistObj;
            onPlaylistChange(playlist, index);
        }
    };

    handleSlotClick = () => {
        this.typeahead.focus();
    };

    render() {
        const { value } = this.state;
        const playlists = this._convertPlaylistToDict(this.props.playlists);
        return (
            <div>
                <div className="search-bar-component">
                    <Autocomplete
                        getItemValue={(item) => item.name}
                        items={playlists}
                        inputProps={{
                            'placeholder': 'Select a playlist to modify',
                            'className': 'playlist-dropdown-input'
                        }}
                        onChange={(e, value) => { this.setState({value}); }}
                        onSelect={(name, playlist) => {
                            this.handleItemChange(playlist);
                        }}
                        renderMenu={this._renderMenu}
                        renderItem={(item) =>
                            <div>
                                <BasePlaylistItem
                                    playlist={item.playlist}
                                />
                            </div>
                        }
                        ref={(e) => { this.typeahead = e; }}
                        value={value}
                        wrapperProps={{
                            'className': 'playlist-dropdown'
                        }}
                    />
                    <PlaylistAddButtonContainer select={true} />
                </div>
                <PlaylistSlotContainer focusDropdown={this.handleSlotClick} />
            </div>
        );
    }
}

PlaylistDropdown.propTypes = {
    onPlaylistChange: PropTypes.func.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object)
};

export default PlaylistDropdown;