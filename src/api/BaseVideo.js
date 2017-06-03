/**
 * Created by cqian19 on 5/23/2017.
 */

/* An abstract class for video objects. Allows for a generic interface for all the domains */

class BaseVideo {

    constructor() {
        this._domain = this._title = this._id = this._thumbnail = "";
    }

    set domainType(domain) {
        this._domain = domain;
    }

    get domainType() {
        return this._domain;
    }

    set title(title) {
        this._title = title;
    }

    get title(){
        return this._title;
    }

    set id(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set thumbnail(thumbnail) {
        this._thumbnail = thumbnail;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    equals(video) {
        if( this.domainType === "" || this.id === "") {
            return false;
        }
        return this.domainType === video.domainType && this.id === video.id;
    }
}

export default BaseVideo;