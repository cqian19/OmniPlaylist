/**
 * Created by cqian19 on 5/23/2017.
 */

/* A base class for video objects. Allows for a generic interface for all the domains */

import { UUID } from '../../utils';

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

    set linkId(id) {
        this._id = id;
    }

    get linkId() {
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
        cl.linkId = this.linkId;
        return cl;
    }

    equals(video) {
        if( this.domainType === "" || this.linkId === "") {
            return false;
        }
        return this.domainType === video.domainType && this.linkId === video.id;
    }

    hash() {
        return this.uniqueId;
    }

    toDbObject() {
        return {
            domain: this.domainType,
            title: this.title,
            thumbnail: this.thumbnail,
            linkId: this.linkId
        }
    }
}

export default BaseVideo;