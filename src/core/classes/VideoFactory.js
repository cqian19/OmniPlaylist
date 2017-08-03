/**
 * Created by cqian19 on 7/31/2017.
 */

import BaseVideo from '../../api/BaseVideo';

class VideoFactory {

    static createVideoFromDbObject(videoDoc) {
        const newVideo = new BaseVideo();
        const {
            domain,
            title,
            linkId,
            thumbnail
        } = videoDoc;
        newVideo.domainType = domain;
        newVideo.linkId = linkId;
        newVideo.thumbnail = thumbnail;
        newVideo.title = title;
        return newVideo;
    }
}

export default VideoFactory;