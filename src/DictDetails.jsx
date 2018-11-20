import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import "./DictDetails.css"

class DictDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.doEdit = this.doEdit.bind(this);
        this.doSave = this.doSave.bind(this);
        this.doCancel = this.doCancel.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.doAdd = this.doAdd.bind(this);
    }

    render() {
        const line = this.props.value;
        if (!line) {
            return <div id="dictdetails"/>;
        }
        return this.state.edit ? 
            <DetailsEdit value={line} onSave={this.doSave} onCancel={this.doCancel}/> : 
            <DetailsShow value={line} onEdit={this.doEdit} onDelete={this.doDelete} onAdd={this.doAdd}/>;
    }

    doEdit() {
        this.setState({
            edit: true
        });
    }

    doSave(line) {
        console.log("save " + JSON.stringify(line));
        this.setState({
            edit: false
        }, () => this.props.onSave(line));
    }

    doCancel() {
        this.setState({
            edit: false
        });
    }

    doAdd() {
        this.setState({
            edit: true
        });
    }

    doDelete() {
        this.setState({
            edit: false
        });
    }
}

class DetailsEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            line: props.value
        }
        this.addTranslation = this.addTranslation.bind(this);
        this.updateOriginal = this.updateOriginal.bind(this);
        this.updateTranslation = this.updateTranslation.bind(this);
        this.doSave = this.doSave.bind(this);
    }
    
    render() {
        const line = this.state.line;
        const translations = line.translations ? line.translations.map((t,idx) => <div key={'trans' + idx}>
            <input idx={idx} value={t} onChange={this.updateTranslation} />
            <Button onClick={this.props.onDelete}>
                <Glyphicon glyph="minus" />
            </Button>
        </div>) : "";
        return <div id="dictdetails">
        <ButtonToolbar>
            <ButtonGroup>
                <Button onClick={this.doSave}>
                    <Glyphicon glyph="ok-sign" />
                </Button>
                <Button onClick={this.props.onCancel}>
                    <Glyphicon glyph="remove-sign" />
                </Button>
            </ButtonGroup>
        </ButtonToolbar>
        <h2><input value={line.original} onChange={evt => this.updateOriginal(evt)}/></h2>
        {translations}
        <Button onClick={this.addTranslation}>
            <Glyphicon glyph="plus" />
        </Button>
    </div>;
    }

    doSave() {
        this.props.onSave(this.state.line);
    }

    updateTranslation(evt) {
        const x = parseInt(evt.target.attributes["idx"].value);
        var newLine = JSON.parse(JSON.stringify(this.state.line));
        newLine.translations[x] = evt.target.value;
        this.setState({
            line: newLine
        });
    }

    updateOriginal(evt) {
        var newLine = JSON.parse(JSON.stringify(this.state.line));
        newLine.original = evt.target.value;
        this.setState({
            line: newLine
        });
    }

    addTranslation() {
        var newLine = JSON.parse(JSON.stringify(this.state.line));
        
        if (newLine.translations) {
            newLine.translations.push("");
        } else {
            newLine.translations = [""];
        }
        this.setState({
            line: newLine
        });
    }
}

class DetailsShow extends Component {
    render() {
        const line = this.props.value;
        const translations = line.translations ? line.translations.map(t => <div key={t}>{t}</div>) : "";
        return <div id="dictdetails">
        <ButtonToolbar>
            <ButtonGroup>
            <Button onClick={this.props.onEdit}>
                <Glyphicon glyph="pencil" />
            </Button>
            <Button onClick={this.props.onAdd}>
                <Glyphicon glyph="plus" />
            </Button>
            <Button onClick={this.props.onDelete}>
                <Glyphicon glyph="minus" />
            </Button>
            </ButtonGroup>
        </ButtonToolbar>
        <h2>{line.original}</h2>
        {translations}
    </div>;
    }
}

export default DictDetails;