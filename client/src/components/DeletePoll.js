import React from 'react';
import {Button, Col, Glyphicon, Row, Panel} from 'react-bootstrap';
import $ from 'jquery';

import {BASE_URL} from '../constants/endpoints';


export default class DeletePoll extends React.Component {
  constructor(props) {
    super(props);

    this.pollId = this.props.pollId;
    this.deleteEndpoint = BASE_URL + '/api/poll/' + this.pollId + '/delete';
    this.state = {
      warning: 0,
      error: '',
      deleted: false
    };
  }

  handleClick() {
    // make the user click the delete button a second time to confirm
    if (this.state.warning === 1) {
      $.ajax({
        type: 'GET',
        url: this.deleteEndpoint,
        success: this.handleDeleteSuccess.bind(this),  // one day
        error: this.handleDeleteError.bind(this)
      });
    } else {
      this.setState({
        warning: this.state.warning + 1
      });
    }
  }

  handleDeleteSuccess(data) {
    if (data.status === "success") {
      this.setState({
        deleted: true
      });
    } else {
      this.setState({
        error: "Error deleting poll"
      });
    }
  }

  handleDeleteError() {
    this.setState({
      error: "Failed to contact the server"
    });
  }

  render() {
    const pollDeleted = <h1>Poll has been deleted</h1>;
    const error = <Panel header="Error :(" bsStyle="danger">{this.state.error}</Panel>;

    return (
      <div>
        <Row>
          <Col mdOffset={2} md={8}>
            {this.state.deleted ? pollDeleted : null}
            {this.state.error ? error : null}
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col mdOffset={11} md={1}>
            <Button onClick={this.handleClick.bind(this)} bsStyle={this.state.warning ? 'danger' : ''}><Glyphicon glyph="trash"/></Button>
          </Col>
        </Row>
      </div>
    );
  }
}
