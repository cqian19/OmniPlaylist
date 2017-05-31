/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

import PlaylistVideoContainer from '../containers/PlaylistVideoContainer';

class Playlist extends React.Component {

    render(){
        return (
            <div className="playlist width-collapse">
                {this.props.videos.map((video, index) => (
                    <PlaylistVideoContainer
                        video={video}
                        index={index}
                    />
                ))}
            </div>
        )
    }

}

export default Playlist;