/**
 * Created by cqian19 on 6/12/2017.
 */

import PlaylistFactory from '../classes/PlaylistFactory';

export function chooseNextIndex(list, index) {
    return list.length === 0 ? 0 : (index + 1) % list.length;
}

export function choosePrevIndex(list , index) {
    return list.length === 0 ? 0 : (index + list.length - 1) % list.length;
}

export function chooseAfterRemoveIndex(list, index, curIndex) {
    if (index === curIndex) {
        // Go to next video, or previous video if this is the last one
        return curIndex === list.length - 1 ? curIndex - 1 : curIndex;
    } else if (index < curIndex) {
        // Shift down current index if removed video is before current playing video
        return curIndex - 1;
    } else {
        return curIndex;
    }
}

export function chooseAfterAddIndex(curIndex, addIndex) {
    if (curIndex < addIndex) {
        return curIndex;
    } else {
        return curIndex + 1;
    }
}

export function removeAtIndex(list, index) {
    return list.slice(0, index).concat(list.slice(index+1));
}

export function nextVideoIndex(videos, videoIndex) {
    return chooseNextIndex(videos, videoIndex);
}

export function prevVideoIndex(videos, videoIndex) {
    return choosePrevIndex(videos, videoIndex);
}

export function chooseAfterMoveIndex(startIndex, endIndex, currentIndex) {
    if (startIndex === currentIndex) {
        // The current playing video was reordered, return its new index
        return endIndex;
    } else if (startIndex < currentIndex && endIndex >= currentIndex) {
        // The moved video was moved down past the currently playing video, move current playing video up
        return currentIndex - 1;
    } else if (startIndex > currentIndex && endIndex <= currentIndex) {
        // The moved video was moved up past the currently playing video, shift current playing video down
        return currentIndex + 1
    } else {
        // Current playing video index not affected
        return currentIndex;
    }
}

export function makeNewVideoOrdering(startIndex, endIndex, videos) {
    // Video moved from startIndex position to endIndex position
    let newVideos;
    // Video moved down on playlist
    if(startIndex < endIndex) {
        newVideos = [].concat(
            videos.slice(0, startIndex), // Keep all videos up to where the video used to be
            videos.slice(startIndex + 1, endIndex + 1),  // Move these videos down
            [videos[startIndex]], // Insert moved video here
            videos.slice(endIndex + 1)); // Keep all remaining videos in their spot
    } else {
        // Video moved up on playlist
        newVideos = [].concat(
            videos.slice(0, endIndex), // Keep all videos up to the spot the video moved to
            [videos[startIndex]], // Insert video here
            videos.slice(endIndex, startIndex), // Insert all videos after, skipping the video that just moved
            videos.slice(startIndex+1)
        );
    }
    return newVideos;
}

export function changePlaylistVideos(playlists, playlistIndex, videos) {
    if (playlists.length) {
        // Create new playlist with new videos
        const playlist = playlists[playlistIndex];
        const playlistCopy = PlaylistFactory.clonePlaylistWithVideos(playlist, videos);
        playlists = playlists.slice();
        playlists[playlistIndex] = playlistCopy;
    }
    return playlists;
}

export function changePlaylistName(playlists, playlistIndex, playlistName) {
    const playlist = playlists[playlistIndex];
    const playlistCopy = PlaylistFactory.clonePlaylistWithName(playlist, playlistName);
    playlists = playlists.slice();
    playlists[playlistIndex] = playlistCopy;
    return playlists;
}