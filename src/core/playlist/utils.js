/**
 * Created by cqian19 on 6/12/2017.
 */

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

export function removeAtIndex(list, index) {
    return list.slice(0, index).concat(list.slice(index+1));
}


