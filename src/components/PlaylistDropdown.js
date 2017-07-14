/**
 * Created by cqian19 on 7/11/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, SplitButton } from 'react-bootstrap';
import { Typeahead, Menu, menuItemContainer, MenuItem } from 'react-bootstrap-typeahead';

import PlaylistItemContainer from '../containers/PlaylistItemContainer';
import PlaylistSlotContainer from '../containers/PlaylistSlotContainer';

const PlaylistMenuItem = menuItemContainer(MenuItem);

class PlaylistDropdown extends React.Component {


    /* Converts playlists into format readable by Typeahead */
    _convertPlaylistToDict(playlists) {
        return playlists.map((playlist) => ({
            name: playlist.name,
            playlist: playlist
        }));
    }

    _renderMenu(results, menuProps) {
        return (
            <Menu {...menuProps}>
                {results.map((result, index) => (
                    <PlaylistMenuItem option={result} position={index}>
                        <PlaylistItemContainer playlist={result.playlist}/>
                    </PlaylistMenuItem>
                ))}
            </Menu>
        )
    }

    handleClick = () => {
        this.refs.typeahead.getInstance().clear();
    };

    handleChange = ([playlistObj]) => {
        const playlist = playlistObj ? playlistObj.playlist : null;
        this.props.onPlaylistChange(playlist);
    };

    handleSlotClick = () => {
        this.refs.typeahead.getInstance().focus();
    };

    render() {
        const playlists = this.props.playlists.map((playlist) => ({
            name: playlist.name,
            playlist: playlist
        }));
        return (
            <div>
                <Typeahead
                    emptyLabel="No playlists found."
                    labelKey="name"
                    onChange={this.handleChange}
                    onFocus={this.handleClick}
                    options={playlists}
                    placeholder="Select a playlist..."
                    ref="typeahead"
                    renderMenu={this._renderMenu}
                />
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