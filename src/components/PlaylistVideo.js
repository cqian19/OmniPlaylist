/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

class PlaylistVideo extends React.Component {

    render() {
        const video = this.props.video;
        return (
            <div className={"playlist-video " + (this.props.active ? "active" : "")} onClick={this.props.onVideoClick} >
                <img className="thumbnail thumbnail-mini" src={video.thumbnail}/>
                <div className="playlist-video-desc">
                    <div className="playlist-video-title">
                        {video.title}
                    </div>
                    <button className="video-up glyphicon glyphicon-arrow-up" onClick={this.props.onVideoUpClick}/>
                    <button className="video-down glyphicon glyphicon-arrow-down" onClick={this.props.onVideoDownClick}/>
                </div>
            </div>
        )
    }
}
export default PlaylistVideo;