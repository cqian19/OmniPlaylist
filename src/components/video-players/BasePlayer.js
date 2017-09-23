/**
 * Created by cqian19 on 6/9/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

class BasePlayer extends React.Component {

    static state = {
        lastVideo: null
    };

    constructor() {
        super();
        this.state = BasePlayer.state;
    }

    shouldComponentUpdate(nextProps, nextState) {
         if (nextState !== this.state) {
             return true;
         } else if (nextProps.reload || !this.props.videos.length || !nextProps.videos.length) {
             return true;
         } else {
             // Update if the next video being shown is not the one currently on
             return !(nextProps.video.equals(this.props.video));
         }
    }

    componentWillUnmount() {
        this.state.lastVideo = this.props.video;
    }

    savePlayerTime() {
        const { savePlayerTime } = this.props;
        savePlayerTime(0);
    }

    render() {}
}

BasePlayer.propTypes = {
    reload: PropTypes.bool.isRequired,
    savePlayerTime: PropTypes.func.isRequired,
    video:  PropTypes.object.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BasePlayer;