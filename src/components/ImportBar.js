/**
 * Created by cqian19 on 5/21/2017.
 */
import React from 'react';
import YoutubeAPI from '../api/youtube-api';

class ImportBar extends React.Component {

    state = {
        value: ''
    };

    handleSubmit = (event) => {
        link = this.state.value;
        if (!YoutubeAPI.validateLink(event)) {
            this.props.linkFailed();
        } else {
            this.props.handleImport(link);
        }
    };

    handleChange = (event) => {
        this.state.value = event.target.value;
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="import">
                <button>Import</button>
                <input type="text" onChange={this.handleChange}/>
            </form>
        )
    }
}

export default ImportBar;