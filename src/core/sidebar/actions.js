/**
 * Created by cqian19 on 6/5/2017.
 */

import { ON_SIDEBAR_TOGGLE } from '../constants';

export function onSidebarToggle() {
    console.log("TOGGLED");
    return {
        type: ON_SIDEBAR_TOGGLE
    }
}