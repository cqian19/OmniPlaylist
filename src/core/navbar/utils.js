/**
 * Created by cqian19 on 5/21/2017.
 */
import { NAVS } from '../constants';

export function initializeNavs() {
    return NAVS.map((nav, index) => ({
        text: nav,
        key: index + 1
    }))
}