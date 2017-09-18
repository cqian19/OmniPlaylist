/**
 * Created by cqian19 on 8/7/2017.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class PaginatedList extends React.Component {

    static itemsPerPaginate = 40;

    constructor() {
        super();
        this.state = {
            pages: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pages: 1
        })
    }

    _getNextPage = () => {
        const { contents } = this.props;
        const { pages } = this.state;
        if (this.state.pages * PaginatedList.itemsPerPaginate < contents.length) {
            this.setState({
                pages: pages + 1
            });
        }
    };

    _shouldExpand = (scrollPos, scrollSize, listHeight) => {
        const { contents } = this.props;
        const { pages } = this.state;
        const itemsPerPaginate = this.props.itemsPerPaginate || PaginatedList.itemsPerPaginate;
        return scrollSize  - listHeight - scrollPos <= 30 &&
               pages * itemsPerPaginate < contents.length;
    };

    handleScroll = (event)  => {
        const list = event.target;
        const listHeight = list.offsetHeight;
        const scrollPos  = list.scrollTop;
        const scrollSize = list.scrollHeight;
        if (this._shouldExpand(scrollPos, scrollSize, listHeight)) {
            const { pages } = this.state;
            this.setState({
                pages: pages + 1
            });
        }
    };

    render() {
        let { className, contents, header, itemsPerPaginate } = this.props;
        const { pages } = this.state;
        itemsPerPaginate = itemsPerPaginate || PaginatedList.itemsPerPaginate;
        contents = contents.slice(0, pages * itemsPerPaginate);
        return (
            <div className='paginated-list' onScroll={this.handleScroll}>
                <div className={className}>
                    {contents}
                </div>
            </div>
        )
    }
}

PaginatedList.propTypes = {
    className: PropTypes.string,
    contents: PropTypes.array.isRequired,
    itemsPerPaginate: PropTypes.number,
};

export default PaginatedList;