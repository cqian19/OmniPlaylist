/**
 * Created by cqian19 on 5/22/2017.
 */

import React from 'react';
import { Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Error extends React.Component {

    render() {
        const { error } = this.props;
        return (
            <div>
                {error !== ''? (
                    <Tooltip placement="bottom" className="in tooltip-error" id="tooltip-bottom">
                        { error }
                    </Tooltip>
                ): null}
            </div>
        )
    }
}

Error.propTypes = {
    error: PropTypes.string
};

export default Error;