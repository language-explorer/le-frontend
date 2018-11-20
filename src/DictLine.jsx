import React, { Component } from 'react';
import "./DictLine.css"

class DictLine extends Component {
    constructor(props) {
        super(props);
        this.selectDictLine = this.selectDictLine.bind(this);
    }

    render() {
        const line = this.props.line;
        const translations = line.translations ? line.translations.join(", ") : "";
        return <div className="dictline" onClick={this.selectDictLine}>
            <span className="originalWord">{line.original} </span>
            <span className="translatedWord">{translations}</span>
            </div>;
    }

    selectDictLine() {
        this.props.onSelectDictLine(this.props.line);
    }
}

export default DictLine;