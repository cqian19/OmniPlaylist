/**
 * Created by cqian19 on 7/9/2017.
 */

import React from 'react';

import PlaylistDropdownContainer from "../containers/PlaylistDropdownContainer";

export class PlaylistPage extends React.Component {

    render() {
        return(
            <div className="page-container">
                <PlaylistDropdownContainer />
            </div>
        )
    }
}