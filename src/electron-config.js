/**
 * Created by cqian19 on 5/26/2017.
 */
'use strict';
const electron = require('electron');
function create(win, referer) {
    setupAdBlock(win);
    setupYt(win, referer);
}

function setupAdBlock(win) {
    win.webContents.session.webRequest.onBeforeRequest({urls: ['*://*./*']}, function(details, callback) {
        const test_url = details.url;
        const check_block_list = /mathtag.com|pulsemgr.com|advertising.com|bluecava.com|estara\.com|\/site_ads|\.omtrdc\.net|thebrighttag\.com|coremetrics\.com|\.(gr|hk|fm|eu|it|es|is|net|ke|me||tz|za|zm|uk|us|in|com|de|fr|zw|tv|sk|se|php|pk|pl)\/ads?[\-_./\?]|(stats?|rankings?|tracks?|trigg|webtrends?|webtrekk|statistiche|visibl|searchenginejournal|visit|webstat|survey|spring).*.(com|net|de|fr|co|it|se|jp|es)|cloudflare|\/statistics\/|torrent|[\-_./]ga[\-_./]|[\-_./]counter[\-_./\?]|ad\.admitad\.|\/widgets?[\-_./]?ads?|\/videos?[\-_./]?ads?|\/valueclick|userad|track[\-_./]?ads?|\/top[\-_./]?ads?|\/sponsor[\-_./]?ads?|smartadserver|\/sidebar[\-_]?ads?|popunder|\/includes\/ads?|\/iframe[-_]?ads?|\/header[-_]?ads?|\/framead|\/get[-_]?ads?|\/files\/ad*|exoclick|displayad|\ajax\/ad|adzone|\/assets\/ad*|advertisement|\/adv\/*\.|ad-frame|\.com\/bads\/|follow-us|connect-|-social-|googleplus.|linkedin|footer-social.|social-media|gmail|commission|adserv\.|omniture|netflix|huffingtonpost|dlpageping|log204|geoip\.|baidu|reporting\.|paypal|maxmind|geo\.|api\.bit|hits|predict|cdn-cgi|record_|\.ve$|radar|\.pop|\.tinybar\.|\.ranking|.cash|\.banner\.|adzerk|gweb|alliance|adf\.ly|monitor|urchin_post|imrworldwide|gen204|twitter|naukri|hulu.com|baidu|seotools|roi-|revenue|tracking.js|\/tracking[\-_./]?|elitics|demandmedia|bizrate|click-|bidsystem|affiliates?\.|beacon|hit\.|googleadservices|metrix|googleanal|abmr.net|dailymotion|ga.js|survey|trekk|tellapart.com|arcadebanners?|ielsen|cts\.|link_|ga-track|FacebookTracking|quantc|traffic|evenuescien|csi\.gstatic|gen_204|roitra|pixelt|pagetra|metrics|[-_/.]?stats?[.-_/]?|common_|accounts\.|contentad|iqadtile|boxad|audsci.js|ebtrekk|seotrack|clickalyzer|youtube|\/tracker\/|ekomi|clicky|[-_/.]?tracking?[.-_/]?|[-_/.]?track?[.-_/]?|ghostery|hscrm|watchvideo|clicks4ads|mkt[0-9]|createsend|analytix|shoppingshadow|clicktracks|admeld|google-analytics|-analytic|googletagservices|googletagmanager|tracking\.|thirdparty|track\.|pflexads|smaato|medialytics|doubleclick.net|doubleclick.com|\-static|\-static\-|static\-|sponsored\-banner|static\_|\_static\_|tagtray.com|tracking2.channeladvisor.com|js-agent.newrelic.com|agkn.com|twitter.com\/oct\.js|\_static|duckduckgo\.com\/t\/|sponsored_link|sponsored_ad|googleadword|analytics\.|googletakes|adsbygoogle|analytics\-|\-analytic|analytic\-|googlesyndication|\.net\/p\.gif\?|adsense|googleAdIndexTop|\/ads\/|google-ad-|google-ad?|google-adsense-|google-adsense.|google-adverts-|google-adwords|google-afc-|google-afc.|google\/ad\?|google\/adv\.|google160.|google728.|_adv|google_afc.|google_afc_|google_afs.|google_afs_widget|google_caf.js|google_lander2.js|google_radlinks_|googlead|googleafc.|googleafs.|googleafvadrenderer.|googlecontextualads.|googleheadad.|googleleader.|googleleads.|googlempu.|ads\_|\_ads\_|\_ads|dynaTraceMonitor|advertise.js|\_promo\_id\=|bazaarvoice.com|\/b\/ss\/\*\&aqe\=|analytics-static.ugc.bazaarvoice.com|iesnare.com|easyads|easyads|easyadstrack|ebayads|[.\-_/\?](ads?|clicks?|tracks?|tracking|logs?)[.\-_/]?(banners?|mid|trends|pathmedia|tech|units?|vert*|fox|area|loc|nxs|format|call|script|final|systems?|show|tag\.?|collect*|slot|right|space|taily|vids?|supply|true|targeting|counts?|nectar|net|onion|parlor|2srv|searcher|fundi|nimation|context|stats?|vertising|class|infuse|includes?|spacers?|code|images?|vers|texts?|work*|tail|track|streams?|ability||world*|zone|position|vertisers?|servers?|view|partner|data)[.\-_/]?/gi;
        const check_white_list = /seller|min.js|logos?|jquery|catalog|status|premoa.*.jpg|rakuten|nitori-net|search\?tbs\=sbi\:|google.*\/search|\/shopping\/product|aclk?|translate.googleapis.com|encrypted-|product|www.googleadservices.com\/pagead\/aclk|statue|target.com|.css|lib.js|tealeaf.js/gi;
        const block_me = check_block_list.test(test_url);
        const release_me = check_white_list.test(test_url);

        if (release_me) {
            callback({cancel: false})
        } else if(block_me) {
            callback({cancel: true});

        } else {
            callback({cancel: false})
        }
    });
}

function setupYt(win, referer) {
    const ytRequestFilter = {
        urls: ['https://www.youtube.com/get_video_info?*eurl&*']
    };
    win.webContents.session.webRequest.onBeforeRequest(ytRequestFilter, (details, callback) => {
        const url = details.url;
        callback({
            redirectURL: url.replace("eurl", "eurl=http://youtube.com")
        })
    });
    const ytHeaderFilter = {
        urls: ['https://www.youtube.com/*']
    };
    win.webContents.session.webRequest.onBeforeSendHeaders(ytHeaderFilter, (detail, cb) => {
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