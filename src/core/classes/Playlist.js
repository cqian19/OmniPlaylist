/**
 * Created by cqian19 on 6/6/2017.
 */

class Playlist {

    static count = 0;

    constructor(videos, name="", thumbnail="") {
        this._name = name || "Unnamed Playlist " + (++Playlist.count).toString();
        this._thumbnail = thumbnail || videos.length && videos[0].thumbnail || "";
        this._videos = videos;

    }

    get videos() {
        return this._videos;
    }

    set videos(videos) {
        this._videos = videos;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    set thumbnail(thumbnail) {
        this._thumbnail = thumbnail;
    }

    clone() {
        return new Playlist(this.videos, this.name, this.thumbnail);
    }

}

export default Playlist;