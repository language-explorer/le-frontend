import React, { Component } from 'react';
import "./DictPanel.css"
import DictLine from './DictLine';
import DictSearchBox from './DictSearchBox';

class DictPanel extends Component {
    render() {
        const dicts = this.props.dicts;
        const items = dicts.map(t => 
            <DictLine key={t.id} line={t} />
        );
        return <div id="dictionary">
            <DictSearchBox />
            { items }
            </div>;
    }
}

export default DictPanel;