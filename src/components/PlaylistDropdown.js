/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, SplitButton } from 'react-bootstrap';
import { Typeahead, Menu, menuItemContainer, MenuItem } from 'react-bootstrap-typeahead';

import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistSlotContainer from '../containers/PlaylistSlotContainer';
import PlaylistAddButtonContainer from "../containers/PlaylistAddButtonContainer";
import BasePlaylistItem from "./BasePlaylistItem";

const PlaylistMenuItem = menuItemContainer(MenuItem);

class PlaylistDropdown extends React.Component {


    /* Converts playlists into format readable by Typeahead */
    _convertPlaylistToDict(playlists) {
        return playlists.map((playlist, index) => ({
            name: playlist.name,
            playlist: playlist,
            playlistIndex: index
        }));
    }

    _renderMenu = (results, menuProps) => {
        return (
            <Menu {...menuProps}>
                {results.map((result, index) => (
                    <PlaylistMenuItem
                        option={result}
                        position={index}
                        onClick= {() => {this.handleItemChange(result)}}>
                        <BasePlaylistItem
                            playlist={result.playlist}
                        />
                    </PlaylistMenuItem>
                ))}
            </Menu>
        )
    };

    handleFocus = () => {
        this.typeahead.getInstance().clear();
    };

    handleItemChange = (playlistObj) => {
        let playlist, playlistIndex;
        if (playlistObj) {
             playlist = playlistObj.playlist;
             playlistIndex = playlistObj.playlistIndex;
      } else {
             playlist = null;
             playlistIndex = null;
        }
        this.props.onPlaylistChange(playlist, playlistIndex);
    };

    handleSlotClick = () => {
        this.typeahead.getInstance().focus();
    };

    render() {
        const playlists = this._convertPlaylistToDict(this.props.playlists);
        return (
            <div>
                <div className="flex-container-row">
                    <Typeahead
                        emptyLabel="No playlists found."
                        labelKey="name"
                        onFocus={this.handleFocus}
                        options={playlists}
                        placeholder="Select a playlist..."
                        ref={(e) => { this.typeahead = e; }}
                        renderMenu={this._renderMenu}
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