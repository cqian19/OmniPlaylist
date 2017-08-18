/**
 * Created by cqian19 on 7/8/2017.
 */

import React from 'react';

import ImportBarContainer from '../containers/ImportBarContainer';
import PlayerLowerPageContainer from '../containers/PlayerLowerPageContainer';

export class PlayerPage extends React.Component {

    render() {
        return (
            <div className="page-container">
                <ImportBarContainer />
                <PlayerLowerPageContainer />
            </div>
        );
    }
}