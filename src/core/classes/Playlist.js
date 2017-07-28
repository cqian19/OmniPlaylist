/**
 * Created by cqian19 on 6/6/2017.
 */

import { UUID } from '../../utils';

class Playlist {

    static count = 0;

    constructor(videos, name="",) {
        this._name = name || "Unnamed Playlist " + (++Playlist.count).toString();
        this._thumbnail = videos.length && videos[0].thumbnail || "";
        this._videos = videos;
        this._uniqueId = UUID.generate();
    }

    get videos() {
        return this._videos;
    }

    set videos(videos) {
        this._videos = videos;
        this.thumbnail = videos.length && videos[0].thumbnail || "";
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

    get uniqueId() {
        return this._uniqueId;
    }

    clone() {
        return new Playlist(this.videos, this.name);
    }

}

export default Playlist;