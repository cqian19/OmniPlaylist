/**
 * Created by cqian19 on 5/23/2017.
 */

/* An abstract class for video objects. Allows for a generic interface for all the domains */

class BaseVideo {

    constructor(response) {}

    get domainType() {}
    get id() {}
    get thumbnail() {}
    get title() {}

    equals(video) {
        return this.domainType === video.domainType && this.id === video.id;
    }
}

export default BaseVideo;