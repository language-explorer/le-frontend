import React, { Component } from 'react';
import "./TextLine.css"

class TextLine extends Component {
    render() {
        const line = this.props.line;
        return <div className="textline">
            <div className="leftColumn">{line.original}</div>
            <div className="rightColumn">{line.translation}</div>
            </div>;
    }
}

export default TextLine;