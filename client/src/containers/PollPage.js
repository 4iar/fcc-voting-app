import React from 'react';
import {connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import _ from 'lodash';
import $ from 'jquery';

import PollChart from '../components/PollChart';
import ChoiceSelection from '../components/ChoiceSelection';
import DeletePoll from '../components/DeletePoll';
import {BASE_URL} from '../constants/endpoints';


function getState(state) {
  console.log(state.app.polls);
  return {
    polls: state.app.polls
  };
}

@connect(getState)
export default class PollPage extends React.Component {
  constructor(props) {
    super(props);
    this.pollId = this.props.params.pollId;
    this.updateEndpoint = BASE_URL + '/api/poll/' + this.pollId + '/view';

    this.state = {
      description: this.props.polls[this.pollId].description,
      choices: this.props.polls[this.pollId].choices,
      question: this.props.polls[this.pollId].question,
      user: this.props.polls[this.pollId].user,
      pollId: this.pollId
    };
  }

  updatePoll() {
    this.serverRequest = $.get(this.updateEndpoint, function (result) {
      console.log(result);
      this.setPolls(result);
    }.bind(this));
  }

  setPolls(r) {
    const result = r[0];
    this.setState({
      description: result.description,
      choices: result.choices,
      question: result.question,
      user: result.user,
      pollId: this.pollId
    })
  }

  render() {
    return (
      <Grid key={this.state.pollId}>
        <h5>Poll created by {this.state.user}</h5>
        <DeletePoll pollId={this.pollId} />
        <Row>
          <Col mdOffset={2} md={4}>
            <h2>{this.state.question}</h2>
            <h4>{this.state.description}</h4>
            <ChoiceSelection refresh={this.updatePoll.bind(this)} pollId={this.state.pollId} choices={_.keys(this.state.choices)} />
          </Col>
          <Col md={6}>
            <PollChart rawData={this.state.choices} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

