/**
 * Created by cqian19 on 6/9/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

class BasePlayer extends React.Component {

    shouldComponentUpdate(nextProps) {
         if (nextProps.reload || !this.props.videos.length || !nextProps.videos.length) {
             return true;
         } else {
             // Update if the next video being shown is not the one currently on
             return !(nextProps.video.equals(this.props.video));
         }
    }

    render() {}
}

BasePlayer.propTypes = {
    index:  PropTypes.number.isRequired,
    reload: PropTypes.bool.isRequired,
    video:  PropTypes.object,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BasePlayer;