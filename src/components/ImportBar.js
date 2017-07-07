/**
 * Created by cqian19 on 5/21/2017.
 */
import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';

import APIHandler from '../api/APIHandler';
import Error from './Error';

class ImportBar extends React.Component {

    state = {
        value: '',
        validationState: null,
        resetForm: null
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const link = this.state.value;
        this.props.doImport(link);
    };

    handleChange = (event) => {
        this.state.value = event.target.value;
    };

    componentWillUpdate = (nextProps) => {
        const oldValidationState = this.props.validationState;
        const newValidationState = nextProps.validationState;
        if (newValidationState === 'success' || newValidationState === 'error'){
            this.setState({validationState: newValidationState});
            this.textInput.value = "";
            this.props.resetForm();
            if (this.state.resetForm) {
                clearTimeout(this.state.resetForm);
            }
            this.state.resetForm = setTimeout(() => {
                this.setState({validationState: null, resetForm: null});
            }, 3000)
        }
    };

    render() {
        return (
            <div className="import-bar">
                <form onSubmit={this.handleSubmit} className="height-collapse-small import-form">
                    <button className="btn btn-inverse import-button col-xs-2" type="submit">
                        Import
                    </button>
                    <FormGroup className="col-xs-10" validationState={this.state.validationState}>
                        <FormControl inputRef={(input) => { this.textInput = input; }}
                                     type="text"
                                     onChange={this.handleChange}
                        />
                    </FormGroup>
                </form>
                <Error error={this.props.error}/>
            </div>
        )
    }
}

ImportBar.propTypes = {
    error:      PropTypes.string,
    doImport:   PropTypes.func.isRequired,
    resetForm:  PropTypes.func.isRequired,
    validationState: PropTypes.string
};

export default ImportBar;