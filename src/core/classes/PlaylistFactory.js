/**
 * Created by cqian19 on 6/10/2017.
 */

class PlaylistFactory {

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