/**
 * Created by cqian19 on 5/23/2017.
 */

export function getUrlParams(url) {
    let re = /(?:\?|&(?:amp;)?)([^=&#]+)(?:=?([^&#]*))/g,
        match, params = {},
        decode = function (s) {return decodeURIComponent(s.replace(/\+/g, " "));};

    while (match = re.exec(url)) {
        params[decode(match[1])] = decode(match[2]);
    }
    return params;
}