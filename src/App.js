import React, { Component } from 'react';
import './App.css';
import TextPanel from './TextPanel';
import DictPanel from './DictPanel';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dicts: [],
      texts: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8081/api/1.0/dict")
    .then(result => {
      return result.json();
    })
    .then(data => {
      this.setState ({ dicts: data })
    });
    fetch("http://localhost:8081/api/1.0/text")
    .then(result => {
      return result.json();
    })
    .then(data => {
      this.setState ({ texts: data })
    })

  }

  render() {
    return (
      <div className="App">
        <TextPanel texts={this.state.texts}/>
        <DictPanel dicts={this.state.dicts}/>
      </div>
    );
  }
}

export default App;
