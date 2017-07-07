/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Error extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const error = this.props.error;
        return (
            <div>
                {error !== ''? (
                    <Alert bsStyle="danger">
                        {error}
                    </Alert>
                ):(<div></div>)}
            </div>
        )
    }
}

Error.propTypes = {
    error: PropTypes.string.isRequired
};

export default Error;