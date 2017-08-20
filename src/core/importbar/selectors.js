/**
 * Created by cqian19 on 5/21/2017.
 */

export function getImportBar(store) {
    return store.importbar;
}

export function getError(store){
    return getImportBar(store).error;
}

export function getValidationState(store){
    return getImportBar(store).validationState;
}

export function getImporting(store) {
    return getImportBar(store).importing;
}