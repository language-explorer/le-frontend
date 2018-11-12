import React, { Component } from 'react';
import TextLine from './TextLine';
import './TextPanel.css';

class TextPanel extends Component {
    render() {
        const items = this.props.texts.map(t => 
            <TextLine key={t.id} line={t} />
        );
        return <div id="texts">
            { items }
            </div>;
    }
}

export default TextPanel;