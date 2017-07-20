/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withScrolling from 'react-dnd-scrollzone';
import { applyContainerQuery } from 'react-container-query';
import classNames from 'classnames';

import PlaylistVideoContainer from '../containers/PlaylistVideoContainer';

const ScrollingComponent = withScrolling('div');

const query = {
    'invisible': {
        maxWidth: 420
    }
};

class Playlist extends React.Component {

    render(){
        const { playlistIndex, videos } = this.props;
        return (
            <ScrollingComponent className={"playlist width-collapse" + classNames(this.props.containerQuery)}>
                {videos.map((video,index) => (
                    <PlaylistVideoContainer
                        video={video}
                        index={index}
                        playlistIndex={playlistIndex}
                    />
                ))}
            </ScrollingComponent>
        )
    }

}

Playlist.propTypes = {
    index: PropTypes.number.isRequired,
    playlistIndex: PropTypes.number.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object)
};

export default applyContainerQuery(Playlist, query);