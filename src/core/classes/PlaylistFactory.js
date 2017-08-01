/**
 * Created by cqian19 on 6/10/2017.
 */

import Playlist from './Playlist';
import VideoFactory from './VideoFactory';

class PlaylistFactory {

    static createPlaylistFromDbObject(playlistDoc) {
        const {
            name,
            uniqueId,
            playlistIndex
        } = playlistDoc;
        const videos = playlistDoc.videos.map(VideoFactory.createVideoFromDbObject);
        return new Playlist(videos, parseInt(playlistIndex), name, uniqueId, playlistDoc);
    }

    static clonePlaylistWithVideos(playlist, videos) {
        const copy = playlist.clone();
        copy.videos = videos;
        return copy;
    }

    static clonePlaylistWithName(playlist, name) {
        const copy = playlist.clone();
        copy.name = name;
        return copy;
    }

}

export default PlaylistFactory;