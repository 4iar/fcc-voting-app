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
  return {
    polls: state.app.polls,
    userId: state.app.id,
    user: state.app.user
  };
}

@connect(getState)
export default class PollPage extends React.Component {
  constructor(props) {
    super(props);
    this.pollId = this.props.params.pollId;
    this.updateEndpoint = BASE_URL + '/api/poll/' + this.pollId + '/view';

    if (this.props.polls) {
      this.state = {
        description: this.props.polls[this.pollId].description,
        choices: this.props.polls[this.pollId].choices,
        question: this.props.polls[this.pollId].question,
        user: this.props.polls[this.pollId].user,
        voteHistory: this.props.polls[this.pollId].voteHistory,
        createdByUserId: this.props.polls[this.pollId].userId,
        pollId: this.pollId,
      };
    }
  }

  componentWillReceiveProps(newProps) {
    this.setPolls(newProps.polls[this.pollId]);
  }

  updatePoll() {
    this.requestAllPolls = $.get(this.updateEndpoint, function (result) {
      this.setPolls(result[0]);
    }.bind(this));
  }
  setPolls(result) {
    this.setState({
      description: result.description,
      choices: result.choices,
      question: result.question,
      user: result.user,
      voteHistory: result.user,
      createdByUserId: result.userId,
      pollId: this.pollId
    })
  }

  render() {
    let pollPageBody
    let votedFor = null;
    // TODO: make less silly
    if (this.state.voteHistory && this.props.userId) {
      votedFor = this.state.voteHistory[this.props.userId] ? this.state.voteHistory[this.props.userId] : null
      console.log(votedFor)
    }

    if (this.props.polls) {
      pollPageBody = (
        <Grid key={this.state.pollId}>
          <h5>Poll created by {this.state.user}</h5>
          {this.props.userId === this.state.createdByUserId &&
           <DeletePoll pollId={this.pollId} />
          }
          <Row>
            <Col mdOffset={2} md={4}>
              <h2>{this.state.question}</h2>
              <h4>{this.state.description}</h4>
              <ChoiceSelection votedFor={votedFor} loggedIn={!!this.props.user} refresh={this.updatePoll.bind(this)} pollId={this.state.pollId} choices={_.keys(this.state.choices)} />
            </Col>
            <Col md={6}>
              <PollChart rawData={this.state.choices} />
            </Col>
          </Row>
        </Grid>
      )
    }

    return (
      <div>
        {this.props.polls ? pollPageBody : "not loaded"}
      </div>
    )
  }
}

