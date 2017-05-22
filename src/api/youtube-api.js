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

    urlPattern = '/(?:https?:\/\/)?(?:w{3}\.)?youtube\.com\/[0-9.\-A-Za-z]+\?[-a-zA-Z0-9@:%_\+.~#?&//=]*?list=([0-9.\-A-Za-z]+)/';

    static validateLink(link) {
        const linkMatch = this.urlPattern.test(link);
    }

    static _extractPlaylistId(link) {
        // Assumes link is valid
        return this.urlPattern.exec(link)[0];
    }

    static getPlaylist(link) {
        // Assumes link is valid
        axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
                part: 'snippet',
                playlistId: this._extractPlaylistId(link),
                key: key
            }
        }).then(function(response){
            /* Response form:
                --data
                    --items
                        --[Objects]
                            --snippet
                                --title <-- Video title
                                --resourceId
                                    -- videoId <-- video link id
                                --thumbnails
                                    --default
                                        --url <-- video thumbnail url
             */
            console.log(response);
        });
    }
}

export default YoutubeAPI;