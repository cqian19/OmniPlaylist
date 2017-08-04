/**
 * Created by cqian19 on 8/3/2017.
 */

export function formatMilliseconds(milliseconds) {
    /*Formats milliseconds into hours, minutes, seconds*/
    // Format hours
    const hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    // Format minutes
    const minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    // Format seconds
    const seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;
}