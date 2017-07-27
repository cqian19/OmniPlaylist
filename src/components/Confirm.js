/**
 * Created by cqian19 on 7/26/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

/**
 * Modified from {@link https://github.com/GA-MO/react-confirm-alert/blob/master/src/index.js}
 */

class Confirm extends React.Component {

    onClickConfirm = () => {
        this.props.onConfirm();
        this.close()
    };

    onClickCancel = () => {
        this.close()
    };

    onOutsideClick = () => {
        this.close();
    };

    _stopClickthrough(event) {
        event.stopPropagation();
    }

    close = () => {
        const target = document.getElementById('react-confirm-alert');
        target.parentNode.removeChild(target);
    };

    render() {
        const {
            confirmLabel,
            cancelLabel,
            message,
            onConfirm,
            title
        } = this.props;
        return (
            <div className="react-confirm-alert-overlay" onClick={this.onOutsideClick}>
                <div className="react-confirm-alert" onClick={this._stopClickthrough}>
                    {title && <h1>{title}</h1>}
                    {message && <h3>{message}</h3>}
                    <div className="react-confirm-alert-button-group">
                        <button className="btn btn-purple" onClick={this.onClickConfirm}>{confirmLabel}</button>
                        <button className="btn btn-basic" onClick={this.onClickCancel}>{cancelLabel}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export function confirmAlert(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-confirm-alert';
    document.body.appendChild(divTarget);
    render(<Confirm {...properties} />, divTarget);
}

Confirm.propTypes = {
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    title: PropTypes.string
};
export default Confirm;