/**
 * Created by cqian19 on 5/21/2017.
 */
import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import APIHandler from '../api/APIHandler';
import Error from './Error';

class ImportBar extends React.Component {

    state = {
        value: '',
        validationState: null
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const link = this.state.value;
        this.props.handleImport(link);
    };

    handleChange = (event) => {
        this.state.value = event.target.value;
    };

    componentWillUpdate = (nextProps, nextState) => {
        const _this = this;
        const newValidationState = nextProps.validationState;
        if (newValidationState !== this.state.validationState) {
            this.state.validationState = nextProps.validationState;
            if (newValidationState === 'success'){
                setTimeout(function() {
                    _this.textInput.value="";
                }, 1500);
                setTimeout(_this.props.resetForm, 3000);
            }
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="import">
                    <button type="submit">
                        Import
                    </button>
                    <FormGroup validationState={this.state.validationState}>
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

export default ImportBar;