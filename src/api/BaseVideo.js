/**
 * Created by cqian19 on 5/23/2017.
 */

/* A base class for video objects. Allows for a generic interface for all the domains */

import { UUID } from './utilities';

class BaseVideo {

    constructor() {
        this._domain = this._title = this._id = this._thumbnail = "";
        this._uniqueID = UUID.generate();
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

    get uniqueId() {
        return this._uniqueID;
    }

    set thumbnail(thumbnail) {
        this._thumbnail = thumbnail;
    }

    get thumbnail() {
        return this._thumbnail;
    }

    clone() {
        const cl = new BaseVideo;
        cl.domainType = this.domainType;
        cl.title = this.title;
        cl.thumbnail = this.thumbnail;
        cl.id = this.id;
        return cl;
    }
    equals(video) {
        if( this.domainType === "" || this.id === "") {
            return false;
        }
        return this.domainType === video.domainType && this.id === video.id;
    }
}

export default BaseVideo;