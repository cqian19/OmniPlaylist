/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withScrolling from 'react-dnd-scrollzone';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { applyContainerQuery } from 'react-container-query';


import PlaylistVideoContainer from '../containers/PlaylistVideoContainer';
import { scrollTo } from '../utils';

const ScrollingComponent = withScrolling('div');

class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
            activeElem: null,
        }
    }

    setActiveElem = (elem) => {
        this.state.activeElem = findDOMNode(elem);
    };

    _scrollToActiveVideo() {
        const domNode = this.state.activeElem;
        if (domNode) {
            this.state.activeElem = null;
            const scroll = findDOMNode(this.scroll);
            scrollTo(scroll, domNode);
        }
    }

    componentDidMount() {
        this._scrollToActiveVideo();
    }

    componentDidUpdate() {
        this._scrollToActiveVideo();
    }

    render(){
        const { playlists, playlistIndex, videos, hideExtra } = this.props;
        const scrollClassNames = classNames({
            'playlist': true,
            'width-collapse': true,
            'hidden': hideExtra
        });
        return (
            <div className="playlist-wrapper">
                {videos.length ?
                    (<ScrollingComponent ref={(e) => { this.scroll = e;}} className={scrollClassNames}>
                        {videos.map((video, index) => (
                            <PlaylistVideoContainer
                                key={video.uniqueId}
                                index={index}
                                scrollToElem={this.setActiveElem}
                                playlistIndex={playlistIndex}
                                video={video}
                            />
                        ))}
                    </ScrollingComponent>)
                    :
                    (<div className="centered-text playlist-placeholder">
                        {playlists.length? "Empty playlist" : "No playlist"}
                    </div>)
                }
            </div>
        )
    }

}

Playlist.propTypes = {
    changeFlexDir: PropTypes.func.isRequired,
    hideExtra: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlistIndex: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object)
};

export default Playlist;