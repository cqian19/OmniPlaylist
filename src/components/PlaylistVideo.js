/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

class PlaylistVideo extends React.Component {

    handleClick = () => {
        this.props.onVideoClick(this.props.index);
    }

    render() {
        const video = this.props.video;
        return (
            <div className={"playlist-video " + (this.props.active ? "active" : "")} onClick={this.handleClick}>
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                <div className="playlist-video-info">
                    {video.title}
                </div>
            </div>
        )
    }
}
export default PlaylistVideo;