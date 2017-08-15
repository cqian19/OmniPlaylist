/**
 * Created by cqian19 on 7/28/2017.
 */

import { Tween, Easing, update } from 'es6-tween';
import raf from 'raf';

/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
export const UUID = (function() {
    const self = {};
    const lut = []; for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
        const d0 = Math.random()*0xffffffff|0;
        const d1 = Math.random()*0xffffffff|0;
        const d2 = Math.random()*0xffffffff|0;
        const d3 = Math.random()*0xffffffff|0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
    };
    return self;
})();

export function extractEndNumbers(link) {
    return link.match(/(\d)+$/)[0];
}

export function extractEndAlnum(link) {
    return link.match(/[a-z0-9_]+$/)[0];
}

export function scrollTo(scrollContainer, scrollElement, duration) {
    const startPos = scrollContainer.scrollTop;
    const containerHalf = scrollContainer.offsetHeight / 2;
    const containerSize = scrollContainer.scrollHeight;
    const endOffset = scrollElement.offsetTop;
    let endPos;
    // Can't scroll to middle, element is too high
    if (endOffset <= containerHalf) {
        endPos = 0;
    // Can't scroll to middle, element is too low
    } else if (endOffset + containerHalf >= containerSize) {
        endPos = containerSize - scrollContainer.offsetHeight;
    } else {
        endPos = endOffset - containerHalf;
    }
    duration = duration || Math.abs(startPos - endPos) < 400 ? 100 : 300;
    const t = new Tween({y: scrollContainer.scrollTop})
        .to({y: endPos}, duration)
        .on('update', ({y}) => {
            scrollContainer.scrollTop = y;
        }).start();
    function animate() {
        raf(animate);
        update();
    }
    animate();
}