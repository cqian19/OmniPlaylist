/**
 * Created by cqian19 on 7/9/2017.
 */

import React from 'react';

import PlaylistDropdownContainer from "../containers/PlaylistDropdownContainer";
import PlaylistChanger from '../components/PlaylistChanger';

export class PlaylistPage extends React.Component {

    render() {
        return(
            <div className="page-container">
                <PlaylistDropdownContainer />
                <PlaylistChanger />
            </div>
        )
    }
}