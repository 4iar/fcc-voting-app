import React from 'react';
import {Button, Col, ControlLabel, Grid, Row, FormGroup, FormControl, HelpBlock} from 'react-bootstrap';
import $ from 'jquery';
import _ from 'lodash';

import {BASE_URL} from '../constants/endpoints';


export default class CreatePollPage extends React.Component {
  constructor(props) {
    super(props);

    this.createPollEndpoint = BASE_URL + '/api/poll/create';

    this.state = {
        question: '',
        description: '',
        choices: {}
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state)
    let form = this.state;
    form.choices = _.values(form.choices);

    $.ajax({
      type: 'POST',
      url: this.createPollEndpoint,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({poll: this.state}),
      success: null,
      error: null
    });
  }

  handleNonChoicesChange(field, e) {
    console.log(e);
    let newState = {}
    newState[field] = e.target.value;
    console.log(newState);
    this.setState(newState);
  }

  handleChoicesChange(choiceId, e) {
    let newChoicesState = {...this.state.choices};
    newChoicesState[choiceId] = e.target.value;
    console.log(newChoicesState);
    this.setState({
      choices: newChoicesState
    }, () => {console.log(this.state)});
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h2>Create a new poll</h2>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="formValidationSuccess1" validationState="success">
                <ControlLabel>Question</ControlLabel>
                <FormControl onChange={this.handleNonChoicesChange.bind(this, 'question')} type="text" />
                {1 ? null : <HelpBlock>Validation placeholder</HelpBlock>}
              </FormGroup>

              <FormGroup controlId="formValidationWarning1" validationState="warning">
                <ControlLabel>Description</ControlLabel>
                <FormControl onChange={this.handleNonChoicesChange.bind(this, 'description')} componentClass="textarea" placeholder="Description" />
              </FormGroup>

              <FormGroup controlId="formValidationError1" validationState="error">
                <ControlLabel>Input with error</ControlLabel>
                <FormControl placeholder="choice 1" onChange={this.handleChoicesChange.bind(this, 0)} type="text" />
                <br/>
                <FormControl placeholder="choice 2" onChange={this.handleChoicesChange.bind(this, 1)} type="text" />
              </FormGroup>
              <FormGroup>
                <Button onClick={this.handleSubmit.bind(this)} type="submit">
                  Create
                </Button>
              </FormGroup>
            </form>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Grid>
    );
  }
}
