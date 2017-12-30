/**
 * Created by cqian19 on 5/26/2017.
 */
'use strict';
const electron = require('electron');

/*
   Allows embedding of unembeddable Youtube videos, ad blocking
*/
function create(win, referer) {
    win.webContents.session.webRequest.onBeforeRequest(['*://*./*'], (details, cb) => {
        const url = details.url;
        const handledYt = _handleYtBeforeRequest(url, cb);
        if (handledYt) { return; }
        cb({cancel: false});
    });
    const headerFilter = {
        urls: ['https://www.youtube.com/*']
    };
    win.webContents.session.webRequest.onBeforeSendHeaders(headerFilter, (detail, cb) => {
        let {requestHeaders} = detail;
        requestHeaders = Object.assign(requestHeaders, {
            Referer: requestHeaders.Referer || 'https://www.youtube.com/',
            Origin: requestHeaders.Origin || 'https://www.youtube.com/'});
        cb({requestHeaders});
    }, {
        urls: ['<all_urls>'],
        types: ['xmlhttprequest']
    });
}

function _handleYtBeforeRequest(url, callback) {
    // Parameter spoofing for embedding videos
    const pattern = /https:\/\/www\.youtube\.com\/get_video_info\?.*eurl&.*/;
    if (pattern.test(url)) {
        callback({
            redirectURL: url.replace("eurl", "eurl=http://youtube.com")
        });
        return true;
    }
    return false;
}

module.exports = (win) => {
    if (win) {
        create(win);
        return;
    }
    (electron.BrowserWindow || electron.remote.BrowserWindow).getAllWindows().forEach(win => {
        create(win);
    });
    (electron.app || electron.remote.app).on('browser-window-created', (e, win) => {
        create(win);
    });
};