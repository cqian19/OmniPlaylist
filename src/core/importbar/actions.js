/**
 * Created by cqian19 on 5/21/2017.
 */

import { LINK_FAILED, IMPORT_SUCCESS, IMPORT_FAILED, RESET_IMPORT_FORM } from '../constants';
import  YoutubeAPI, { YoutubeVideo } from '../../api/youtube-api';

export function linkFailed() {
    return {
        type: LINK_FAILED
    }
}

function importSuccess(response){
    console.log("Success");
    console.log(YoutubeAPI.getVideosFromResponse(response));
    return {
        type: IMPORT_SUCCESS,
        videos: YoutubeAPI.getVideosFromResponse(response),
    }
}

function importError(){
    return {
        type: IMPORT_FAILED
    }
}

export function importPlaylist(link) {
    return function(dispatch) {
        return YoutubeAPI.fetchPlaylist(link).then(
            response => dispatch(importSuccess(response)),
            error => dispatch(importError(error))
        )
    }
}

export function resetForm() {
    return {
        type: RESET_IMPORT_FORM
    }
}