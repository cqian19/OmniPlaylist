/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

import { DOMAIN_TYPES } from '../core/constants';
import { DOMAIN_TO_PLAYER } from '../core/domain-map-constants';

class Player extends React.Component {

    playerSection() {
        if (this.props.videos.length) {
            const videoDomain = this.props.videos[this.props.index].domainType;
            const Player = DOMAIN_TO_PLAYER[videoDomain];
            return (<Player {...this.props} {...this.state}/>);
        }
    }


    render() {
        return (
            <div className="player">
                {this.playerSection()}
            </div>
        )
    }
}

export default Player;
