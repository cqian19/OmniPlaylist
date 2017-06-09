/**
 * Created by cqian19 on 6/6/2017.
 */

class Playlist {

    static count = 0;

    constructor(videos, name="") {
        this._videos = videos;
        if (name === "") {
            this._name = "Unnamed Playlist " + (++Playlist.count).toString();
        } else {
            this._name = name;
        }
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

}

export default Playlist;