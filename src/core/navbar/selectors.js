/**
 * Created by cqian19 on 5/21/2017.
 */

export function getNavBar(state) {
    return state.navbar;
}

export function getNavs(state) {
    return getNavBar(state).navs;
}