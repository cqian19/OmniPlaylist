/**
 * Created by cqian19 on 5/21/2017.
 */

export function getApp(store) {
    return store.app;
}

export function getHideExtra(store) {
    return getApp(store).hideExtra;
}