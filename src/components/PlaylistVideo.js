/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

class PlaylistVideo extends React.Component {

    render() {
        const video = this.props.video;
        return (
            <div>{video.title}</div>
        )
    }
}
export default PlaylistVideo;