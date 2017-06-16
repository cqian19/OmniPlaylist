/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import withScrolling from 'react-dnd-scrollzone';
import { applyContainerQuery } from 'react-container-query';
import classnames from 'classnames';

import PlaylistVideoContainer from '../containers/PlaylistVideoContainer';

const ScrollingComponent = withScrolling('div');

const query = {
    'invisible': {
        maxWidth: 420
    }
};

class Playlist extends React.Component {

    render(){
        return (
            <ScrollingComponent className={"playlist width-collapse " + classnames(this.props.containerQuery)}>
                {this.props.videos.map((video,index) => (
                    <PlaylistVideoContainer
                        video={video}
                        index={index}
                    />
                ))}
            </ScrollingComponent>
        )
    }

}

export default applyContainerQuery(Playlist, query);