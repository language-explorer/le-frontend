import React, { Component } from 'react';
import TextLine from './TextLine';
import { Table, Modal, Button, FormControl } from 'react-bootstrap';
import './TextPanel.css';

class TextPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditor: false,
            editItem: {}
        };
        this.doEdit = this.doEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.editOriginal = this.editOriginal.bind(this);
        this.editTranslation = this.editTranslation.bind(this);
    }

    render() {
        const items = this.props.texts.map(t => 
            <TextLine key={t.id} line={t} onEdit={this.doEdit}/>
        );
        return <div id="texts">
                <Table striped bordered condensed hover>
                    <tbody>
                        { items }
                    </tbody>
                </Table>
                <Modal show={this.state.showEditor} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Texteintrag bearbeiten</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                        <FormControl componentClass="textarea" placeholder="Original" value={this.state.editItem.original} onChange={this.editOriginal} style={{height: '200px'}}/>
                        </p>
                        <p>
                        <FormControl componentClass="textarea" placeholder="Übersetzung" value={this.state.editItem.translation} onChange={this.editTranslation} style={{height: '200px'}}/>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleSave}>Speichern</Button>
                        <Button onClick={this.handleClose}>Abbrechen</Button>
                    </Modal.Footer>
                </Modal>
            </div>;
    }

    editOriginal(evt) {
        const t = JSON.parse(JSON.stringify(this.state.editItem));
        t.original = evt.target.value;
        this.setState({
            editItem: t
        });
    }

    editTranslation(evt) {
        const t = JSON.parse(JSON.stringify(this.state.editItem));
        t.translation = evt.target.value;
        this.setState({
            editItem: t
        });
    }

    handleSave() {
        this.props.onSaveItem(this.state.editItem);
        this.setState({
            showEditor: false
        });
    }

    handleClose() {
        this.setState({
            showEditor: false
        });
    }

    doEdit(item) {
        this.setState({
            showEditor: true,
            editItem: item
        });
    }
}

export default TextPanel;