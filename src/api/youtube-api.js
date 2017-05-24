import axios from 'axios';

const key = "AIzaSyBFeCSptMDugs4MIx-GGD3JmwFz1IDyIGI";

export class YoutubeVideo {

    constructor(video){
        this.video = video;
    }

    get title(){
        return this.video.snippet.title;
    }

    get id() {
        return this.video.snippet.resourceId;
    }

    get thumbnail() {
      return this.video.snippet.thumbnails.default.url;
    }
}

class YoutubeAPI {

    static urlPattern = /(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/[0-9.\-A-Za-z]+\?[-a-zA-Z0-9@:%_\+.~#?&//=]*?list=([0-9.\-A-Za-z_]+)/;

    static validateLink = (link) => {
        return YoutubeAPI.urlPattern.test(link);
    };

    static _extractPlaylistId = (link)  => {
        // Assumes link is valid
        return YoutubeAPI.urlPattern.exec(link)[1];
    };

    static getVideosFromResponse(response) {
        return response.data.items.map((videoResponse) => new YoutubeVideo(videoResponse));
    }

    static fetchPlaylist(link) {
        // Assumes link is valid, returns a Promise
        /* Response form:
         --data
            --nextPageToken
            --prevPageToken
            --items
                 --[Objects]
                     --snippet
                     --title <-- Video title
                     --resourceId
                         -- videoId <-- video link id
                     --thumbnails
                     --default
                         --url <-- video thumbnail url */
        return axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
                part: 'snippet',
                playlistId: this._extractPlaylistId(link),
                key,
                maxResults: 50
            }
        });
    }
}

export default YoutubeAPI;