/**
 * Created by cqian19 on 7/14/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import PlaylistDisplayVideoContainer from '../containers/PlaylistDisplayVideoContainer';

const UUID = (function() {
    const self = {};
    const lut = []; for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
        const d0 = Math.random()*0xffffffff|0;
        const d1 = Math.random()*0xffffffff|0;
        const d2 = Math.random()*0xffffffff|0;
        const d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    };
    return self;
})();

class PlaylistDisplay extends React.Component {

    render() {
        const { playlists, playlistIndex } = this.props;
        const playlist = playlists[playlistIndex];
        return (
            <div className='playlist-display'>
                {playlist ? (
                    playlist.videos.map((video,index) => {
                        return (
                            <PlaylistDisplayVideoContainer
                                key={video.uniqueId}
                                index={index}
                                playlistIndex={playlistIndex}
                                video={video}
                            />
                        )
                    })
                ) : (
                    <div>No playlist selected</div>
                )}
            </div>
        );
    }
}

PlaylistDisplay.propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object),
    playlistIndex: PropTypes.number.isRequired
};

export default PlaylistDisplay;