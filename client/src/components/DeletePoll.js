import React from 'react';
import {Button, Col, Glyphicon, Row} from 'react-bootstrap';


export default class DeletePoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warning: 0
    };
  }

  handleClick() {
    if (this.state.warning === 1) {
      //delete calls here
    } else {
      this.setState({
        warning: this.state.warning + 1
      });
    }
  }

  render() {
    return (
      <Row>
        <Col mdOffset={11} md={1}>
          <Button onClick={this.handleClick.bind(this)} bsStyle={this.state.warning ? 'danger' : ''}><Glyphicon glyph="trash"/></Button>
        </Col>
      </Row>
    );
  }
}
