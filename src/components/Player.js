/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { DOMAIN_TYPES } from '../core/constants';
import { DOMAIN_PROPS } from '../core/domain-map-constants';

import ResizableVideoContainer from '../containers/ResizablePlayerWrapperContainer';
import { OEmbedPlayer } from './video-players';

class Player extends React.Component {

    playerSection() {
        const { video, videos } = this.props;
        if (videos.length) {
            const videoDomain = video.domainType;
            const DomainPlayer = DOMAIN_PROPS[videoDomain].player;
            return (<DomainPlayer {...this.props} />);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.reload) {
            this.props.onPlayerReload();
        }
    }

    render() {
        const { video } = this.props;
        if (!video) { return null; }
        return (
            <div className="player">
                <div className="player__inner">
                    <div className="player__main">
                        <ResizableVideoContainer>
                            {this.playerSection()}
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
                        </ResizableVideoContainer>
                    </div>
                </div>
            </div>
        )
    }
}

Player.propTypes = {
    index:   PropTypes.number.isRequired,
    onEnded: PropTypes.func.isRequired,
    onPlayerReload: PropTypes.func.isRequired,
    onSkip:  PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    reload:  PropTypes.bool.isRequired,
    video:   PropTypes.object,
    videos:  PropTypes.arrayOf(PropTypes.object)
};

export default Player;
