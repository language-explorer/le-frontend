import React, { Component } from 'react';
import "./DictSearchBox.css"

class DictSearchBox extends Component {
    search(e) {
        if (e.key === 'Enter') {
            alert("search " + e.key);
        }
    }
    render() {
        return <div id="searchbox">
                <input onKeyPress={this.search}/>
            </div>;
    }
}

export default DictSearchBox;