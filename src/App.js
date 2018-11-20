import React, { Component } from 'react';
import TextPanel from './TextPanel';
import DictPanel from './DictPanel';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      texts: [],
      selectedDictId: null
    }
    this.searchWords = this.searchWords.bind(this);
    this.doSaveItem = this.doSaveItem.bind(this);
  }

  componentDidMount() {
    this.loadTexts();
  }

  loadTexts() {
    fetch("http://localhost:8081/api/1.0/text?filterId=" + (this.state.selectedDictId ? this.state.selectedDictId : ""))
    .then(result => {
      return result.json();
    })
    .then(data => {
      this.setState ({ texts: data })
    })
  }

  render() {
    const app = <div className="App">
      <TextPanel texts={this.state.texts} onSaveItem={this.doSaveItem}/>
      <DictPanel onSelectDictLine={this.searchWords}/>
    </div>;
    return app
  }

  searchWords(id) {
    this.setState({
      selectedDictId: id
    }, () => this.loadTexts());
  }

  doSaveItem(item) {
    fetch("http://localhost:8081/api/1.0/text", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
    .then(data => {
        this.loadTexts();
    });
  }
}

export default App;
