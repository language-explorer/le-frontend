import React, { Component } from 'react';
import { Dropdown, ButtonToolbar, MenuItem } from 'react-bootstrap';
import "./TextLine.css"

class TextLine extends Component {
    constructor(props) {
        super(props);
        this.doEdit = this.doEdit.bind(this);
    }

    render() {
        const line = this.props.line;
        return <tr>
                <td style={{width: 50 + "%"}}>{line.original}</td>
                <td>{line.translation}</td>
                <td>
                    <ButtonToolbar>
                        <Dropdown id={"dd" + line.id} title="Aktionen" pullRight>
                            <Dropdown.Toggle bsStyle="info" />
                            <Dropdown.Menu>
                                <MenuItem eventKey="1" onSelect={this.doEdit}>Bearbeiten</MenuItem>
                                <MenuItem eventKey="2">Löschen</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ButtonToolbar>
                </td>
            </tr>;
    }

    doEdit() {
        this.props.onEdit(this.props.line);
    }
}

export default TextLine;