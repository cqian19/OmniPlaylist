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

const query = {
    'invisible': {
        maxWidth: 420
    }
};

class Playlist extends React.Component {

    constructor() {
        super();
        this.state = {
            activeElem: null
        }
    }

    setActiveElem = (elem) => {
        this.state.activeElem = findDOMNode(elem);
    };

    _scrollToActiveVideo() {
        const domNode = this.state.activeElem;
        if (domNode) {
            this.state.activeElem = null;
            const scroll = findDOMNode(this.refs.scroll);
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
        const { playlistIndex, videos } = this.props;
        return (
            <ScrollingComponent ref='scroll' className={"playlist width-collapse" + classNames(this.props.containerQuery)}>
                {videos.map((video,index) => (
                    <PlaylistVideoContainer
                        key={video.uniqueId}
                        index={index}
                        scrollToElem={this.setActiveElem}
                        playlistIndex={playlistIndex}
                        video={video}
                    />
                ))}
            </ScrollingComponent>
        )
    }

}

Playlist.propTypes = {
    containerQuery: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    playlistIndex: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object)
};

export default applyContainerQuery(Playlist, query);