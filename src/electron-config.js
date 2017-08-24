/**
 * Created by cqian19 on 5/26/2017.
 */
'use strict';
const electron = require('electron');
function create(win, referer) {
    const requestFilter = {
        urls: ['https://www.youtube.com/get_video_info?*eurl&*']
    };
    win.webContents.session.webRequest.onBeforeRequest(requestFilter, (details, callback) => {
        const url = details.url;
        callback({
            redirectURL: url.replace("eurl", "eurl=http://youtube.com")
        })
    });
    const headerFilter = {
        urls: ['https://www.youtube.com/*']
    };
    win.webContents.session.webRequest.onBeforeSendHeaders(headerFilter, (detail, cb) => {
        let {requestHeaders} = detail;
        requestHeaders = Object.assign(requestHeaders, {
            Referer: requestHeaders.Referer || referer,
            Origin: requestHeaders.Origin || referer});
        cb({requestHeaders});
    }, {
        urls: ['<all_urls>'],
        types: ['xmlhttprequest']
    });
}

module.exports = (referer, win) => {
    if (typeof referer !== 'string') {
        throw new TypeError('Expected a string');
    }

    if (win) {
        create(win, referer);
        return;
    }

    (electron.BrowserWindow || electron.remote.BrowserWindow).getAllWindows().forEach(win => {
        create(win, referer);
    });
    (electron.app || electron.remote.app).on('browser-window-created', (e, win) => {
        create(win, referer);
    });
};