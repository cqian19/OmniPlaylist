/**
 * Created by cqian19 on 6/9/2017.
 */

import React from 'react';

export class BasePlayer extends React.Component {

    shouldComponentUpdate(nextProps) {
         if (nextProps.reload || !this.props.videos.length || !nextProps.videos.length) {
             return true;
         } else {
             // Update if the next video being shown is not the one currently on
             return !(nextProps.videos[nextProps.index].equals(this.props.videos[this.props.index]));
         }
    }

    render() {}
}
