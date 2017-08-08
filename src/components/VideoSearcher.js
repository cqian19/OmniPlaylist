/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SearchInput, { createFilter } from 'react-search-input';

import SearchedVideoContainer from '../containers/SearchedVideoContainer';
import PaginatedList from './PaginatedList';

class VideoSearcher extends React.Component {

    state = {
        searchTerm: '',
        isRequesting: false
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

    _createRenderList(filteredVideos) {
        return filteredVideos.map((videoDict) => {
            return (
                <SearchedVideoContainer
                    video={videoDict.video}
                />
            )
        })
    }

    _searchUpdated = (term) => {
        this.setState({searchTerm: term});
    };

    _generateHeader() {
        return (
            <div className='video-searcher__head'>
                <SearchInput className='search-input' onChange={this._searchUpdated} />
            </div>
        )
    }
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
                  <PaginatedList
                      className='video-searcher__body'
                      contents={this._createRenderList(filteredVideos)}
                  />
            </div>
        );
    }
}

VideoSearcher.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object)
};

export default VideoSearcher;