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

}

export default BaseVideo;