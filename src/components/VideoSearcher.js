/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead, Menu, MenuItem, menuItemContainer } from 'react-bootstrap-typeahead';
import SearchInput, { createFilter } from 'react-search-input';
import SearchedVideoContainer from '../containers/SearchedVideoContainer';

const VideoMenuItem = menuItemContainer(MenuItem);

class VideoSearcher extends React.Component {

    state = {
        searchTerm: ''
    };

    _generateVideos(playlists) {
        const differentVideos = new Map();
        for (let playlist of playlists) {
            for (let video of playlist.videos) {
                differentVideos.set(video.hash(), video);
            }
        }
        return differentVideos.values();
    }

    _convertVideosToDict(videos) {
        const dictVideos = [];
        for (let video of videos) {
            dictVideos.push({
                name: video.title,
                index: dictVideos.length,
                video
            });
        }
        return dictVideos;
    }

    _shouldUpdateResults(term) {
        return term.length;
    }

    _doFilter(allVideos) {
        const term = this.state.searchTerm;
        if (this._shouldUpdateResults(term)) {
            return allVideos.filter(createFilter(term, ['name']));
        } else {
            return [];
        }
    }

    _searchUpdated = (term) => {
        this.setState({searchTerm: term});
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    render() {
        const { playlists } = this.props;
        const allVideos = this._convertVideosToDict(this._generateVideos(playlists));
        const filteredVideos = this._doFilter(allVideos);
        return (
            <div className='video-searcher'>
                  <div className='video-searcher__head'>
                      <SearchInput className='search-input' onChange={this._searchUpdated} />
                  </div>
                  <div className='video-searcher__body' >
                    {filteredVideos.map((videoDict) => {
                        return (
                            <SearchedVideoContainer
                                video={videoDict.video}
                            />
                        )
                    })}
                  </div>
            </div>
        );
    }
}

VideoSearcher.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object)
};

export default VideoSearcher;