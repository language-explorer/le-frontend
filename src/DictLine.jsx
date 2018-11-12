import React, { Component } from 'react';
import "./DictLine.css"

class DictLine extends Component {
    render() {
        const line = this.props.line;
        const translations = line.translations ? line.translations.map(t => t) : "";
        return <div className="dictline">
            <span className="originalWord">{line.original} </span>
            <span className="translatedWord">{translations}</span>
            </div>;
    }
}

export default DictLine;