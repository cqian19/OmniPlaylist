/**
 * Created by cqian19 on 8/1/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { confirmAlert } from './Confirm';

class PlaylistRemoveButton extends React.Component {

    handleRemove = (event) => {
        event.stopPropagation();
        const { confirm, onRemove } = this.props;
        if (this.props.confirm) {
            confirmAlert({
                message: 'Do you want to delete this playlist?',
                confirmLabel: 'Confirm',
                cancelLabel: 'Cancel',
                onConfirm: onRemove
            });
        } else {
            onRemove();
        }
    };

    render() {
        return (
            <span className="playlist-remove" onClick={this.handleRemove}>
                <i className="glyphicon glyphicon-remove" />
            </span>
        );
    }
}

PlaylistRemoveButton.propTypes = {
    confirm: PropTypes.bool,
    onRemove: PropTypes.func.isRequired
};

export default PlaylistRemoveButton;