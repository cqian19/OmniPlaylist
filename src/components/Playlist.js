/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import withScrolling from 'react-dnd-scrollzone';

import PlaylistVideoContainer from '../containers/PlaylistVideoContainer';

const ScrollingComponent = withScrolling('div');

class Playlist extends React.Component {

    render(){
        return (
            <ScrollingComponent className="playlist width-collapse">
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

export default Playlist;