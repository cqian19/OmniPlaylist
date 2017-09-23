/**
 * Created by cqian19 on 7/24/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Button, Tooltip, Glyphicon } from 'react-bootstrap';

class PlaylistAddButton extends React.Component {

    _createTooltip() {
        return (
            <Tooltip>
                New playlist
            </Tooltip>
        );
    }

    render() {
        return (
            <OverlayTrigger placement="bottom" overlay={this._createTooltip()} >
                <Button className = "btn playlist-add-button" bsClass="glyphicon" onClick={this.props.onClick} >
                    <Glyphicon glyph="plus" />
                </Button>
            </OverlayTrigger>
        );
    }
}

PlaylistAddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    select: PropTypes.bool,
    swapPlay: PropTypes.bool
};

export default PlaylistAddButton;