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
        choices: {0: '', 1: ''}
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
    let newChoices = {...this.state.choices};
    newChoices[choiceId] = e.target.value;

    const allChoicesFilledIn = _.values(newChoices).reduce((prev, curr) => {
      return prev && !!curr;
    }, true)
    // if all inputs are filled in (truthy) then we need to add a new one
    // so the user can keep adding more choices
    if (allChoicesFilledIn) {
      newChoices[_.size(newChoices)] = '';
    }

    this.setState({
      choices: newChoices
    }, () => {console.log(this.state)});
  }

  validateDescription() {
    if (this.state.question.length > 0) {
      return "success";
    } else {
      return "error";
    }
  }

  validateChoices(choiceKey) {
    // TODO: refactor this
    const choice = this.state.choices[choiceKey]
    if (!choice) {
      if (choiceKey === "0" || choiceKey === "1") {
        return "error";
      } else {
        return "warning";
      }
    } else {
      return "success";
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h2>Create a new poll</h2>

            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup validationState={this.validateDescription()}>
                <ControlLabel>Question</ControlLabel>
                <FormControl onChange={this.handleNonChoicesChange.bind(this, 'question')} type="text" />
                {1 ? null : <HelpBlock>Validation placeholder</HelpBlock>}
              </FormGroup>

              <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl onChange={this.handleNonChoicesChange.bind(this, 'description')} componentClass="textarea" placeholder="Description" />
              </FormGroup>

              <ControlLabel>Choices</ControlLabel>
              {_.keys(this.state.choices).map((i) => {
                console.log(i)
                return (
                  <FormGroup validationState={this.validateChoices(i)}>
                    <FormControl placeholder={"choice " + (Number(i) + 1)} onChange={this.handleChoicesChange.bind(this, i)} type="text" />
                  </FormGroup>
                )
              })}

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
