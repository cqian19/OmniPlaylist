/**
 * Created by cqian19 on 8/17/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { CustomPlayer } from './CustomPlayer';
import { SoundCloudAPI } from '../../api';

let key = '';
export class SoundCloudPlayer extends CustomPlayer {

    componentWillMount() {
        if(!key) {
            SoundCloudAPI.fetchKey().then((response) => {
                key = response.data.key;
                this.setState({key});
            });
        }
    }

    _prepareURL(url) {
        return `${url}?client_id=${key}`
    }

    render() {
        const { video } = this.props;
        return (
            <div>
                {key ? (
                    <CustomPlayer {...this.props}
                       videoSource={this._prepareURL(video.linkId)}
                    />
                ) : (
                    'Loading SoundCloud video...'
                )}
            </div>
        );
    }


}

CustomPlayer.propTypes = {
    onEnded: PropTypes.object.isRequired,
    video: PropTypes.object.isRequired
};