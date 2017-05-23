/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

class PlaylistVideo extends React.Component {

    render() {
        const video = this.props.video;
        return (
            <div className="playlist-video">
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                {video.title}
            </div>
        )
    }
}
export default PlaylistVideo;