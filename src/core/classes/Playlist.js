/**
 * Created by cqian19 on 6/6/2017.
 */

import { UUID } from '../../utils';
import { getDb } from '../../database';

class Playlist {

    constructor(videos, playlistIndex, name="", uniqueId="", document="") {
        this._name = name || "Unnamed Playlist";
        this._thumbnail = videos.length && videos[0].thumbnail || "";
        this._videos = videos;
        this._uniqueId = uniqueId || UUID.generate();
        this._document = document || this._saveToDb(playlistIndex);
        this._playlistIndex = playlistIndex;
    }

    get videos() {
        return this._videos;
    }

    set videos(videos) {
        this._videos = videos;
        this.thumbnail = videos.length && videos[0].thumbnail || "";
        this._updateDb({
            videos: videos.map((video) => video.toDbObject())
        });
    }


    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
        this._updateDb({
            name
        });
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

    get document() {
        return this._document;
    }

    get playlistIndex() {
        return this._playlistIndex;
    }

    set playlistIndex(playlistIndex) {
        this._playlistIndex = playlistIndex;
        this._updateDb({playlistIndex: playlistIndex.toString()});
    }

    clone() {
        return new Playlist(this.videos, this.playlistIndex, this.name, this.uniqueId, this.document);
    }

    async _updateDb(updateDict) {
        await this._document;
        for (let key in updateDict) {
            this.document.atomicUpdate(function(doc) {
                doc[key] = updateDict[key];
            });
        }
    }

    /* Adds this playlist to end of playlists in database */
    async _saveToDb(playlistIndex) {
        const db = await getDb();
        this._document = await db.playlist.insert(this._toDbObject(playlistIndex));
    }

    async removeFromDb() {
        this.document.remove();
    }

    _toDbObject(playlistIndex) {
        return {
            name: this.name,
            uniqueId: this.uniqueId,
            videos: this.videos.map((video) => video.toDbObject()),
            playlistIndex: playlistIndex.toString()
        };
    }
}

export default Playlist;