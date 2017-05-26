/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

import PlaylistVideo from './PlaylistVideo';

class Playlist extends React.Component {

    render(){
        return (
            <div className="playlist col-md-6">
                {this.props.videos.map((video, index) => (
                    <PlaylistVideo
                        key={index}
                        video={video}
                        index={index}
                        onVideoClick={this.props.onVideoClick}
                        active={index===this.props.index}
                    />
                ))}
            </div>
        )
    }

}

export default Playlist;