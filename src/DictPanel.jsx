import React, { Component } from 'react';
import "./DictPanel.css"
import DictLine from './DictLine';
import DictSearchBox from './DictSearchBox';
import DictDetails from './DictDetails';

class DictPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dicts: [],
            searchValue: null,
            selectedDictEntry: null
        };
        this.doSearch = this.doSearch.bind(this);
        this.selectDictLine = this.selectDictLine.bind(this);
        this.doSave = this.doSave.bind(this);
    }

    componentDidMount() {
        this.loadDictionary();
    }    

    render() {
        const dicts = this.state.dicts;
        const items = dicts.map(t => 
            <DictLine key={t.id} line={t} onSelectDictLine={this.selectDictLine}/>
        );
        return <div id="dictionary">
                <DictDetails value={this.state.selectedDictEntry} onSave={this.doSave} />
                <div id="dictitems">
                    <DictSearchBox onSearch={this.doSearch}/>
                    { items }
                </div>
            </div>;
    }

    selectDictLine(line) {
        this.setState({
            selectedDictEntry: line
        });
        this.props.onSelectDictLine(line.id);
    }

    loadDictionary() {
        fetch("http://localhost:8081/api/1.0/dict?filter=" + (this.state.searchValue ? this.state.searchValue : ""))
        .then(result => {
          return result.json();
        })
        .then(data => {
          this.setState ({ dicts: data });
        });
    }

    doSave(dictEntry) {
        fetch("http://localhost:8081/api/1.0/dict", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dictEntry)
        })
        .then(result => {
            return result.json();
        })
        .then(data => {
            this.loadDictionary();
        });
    }

    doSearch(text) {
        this.setState({
            searchValue: text
        }, () => {
            this.loadDictionary();
        });
    }
}

export default DictPanel;