import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import "./DictSearchBox.css"

class DictSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        }
        this.search = this.search.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    search(e) {
        if (e.key === 'Enter') {
            this.props.onSearch(this.state.searchValue);
            return true;
        }
        return false;
    }

    render() {
        return <div id="searchbox">
                <input value={this.state.searchValue} onChange={evt => this.updateSearchValue(evt)} onKeyPress={this.search}/>
                <Button onClick={this.clearSearch}>
                    <Glyphicon glyph="remove-sign" />
                </Button>
            </div>;
    }

    clearSearch() {
        this.setState({
            searchValue: ""
        }, () => this.props.onSearch(this.state.searchValue));
    }

    updateSearchValue(evt) {
        this.setState({
            searchValue: evt.target.value
        });
    }
}

export default DictSearchBox;