/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';

import { DOMAIN_TYPES } from '../core/constants';
import { DOMAIN_TO_PLAYER } from '../core/domain-map-constants';

import ResizableVideoContainer from '../containers/ResizableVideoContainer';

class Player extends React.Component {

    playerSection() {
        if (this.props.videos.length) {
            const videoDomain = this.props.video.domainType;
            const DomainPlayer = DOMAIN_TO_PLAYER[videoDomain];
            return (<DomainPlayer {...this.props} />);
        }
    }

    componentDidUpdate() {
        this.props.onPlayerReload();
    }

    render() {
        return (
            <div className="player">
                <div className="player__inner">
                    <div className="player__main">
                        <ResizableVideoContainer>
                            {this.playerSection()}
                        </ResizableVideoContainer>
                    </div>
                    <div className="player__footer display-row">
                        {/* Previous Video Button */}
                        <span className="btn icon-btn" onClick={this.props.onPrev}>
                            <i className="glyphicon glyphicon-fast-backward"/>
                        </span>
                        {/* Skip Video Button */}
                        <span className="btn icon-btn" onClick={this.props.onSkip}>
                            <i className="glyphicon glyphicon-fast-forward"/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Player;
