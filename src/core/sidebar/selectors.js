/**
 * Created by cqian19 on 6/5/2017.
 */

export function getSidebar(store) {
    return store.sidebar;
}

export function getSidebarToggled(store) {
    return getSidebar(store).toggled;
}

export function getStateToggled(state) {
    return state.toggled;
}