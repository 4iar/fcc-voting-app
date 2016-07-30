import React from 'react';
import {connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import _ from 'lodash';

import PollChart from '../components/PollChart';
import ChoiceSelection from '../components/ChoiceSelection';


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

    this.state = {
      description: this.props.polls[this.pollId].description,
      choices: this.props.polls[this.pollId].choices,
      question: this.props.polls[this.pollId].question,
      pollId: this.pollId
    };
  }

  render() {
    return (
      <Grid key={this.state.pollId}>
        <Row>
          <Col mdOffset={2} md={4}>
            <h2>{this.state.question}</h2>
            <h4>{this.state.description}</h4>
            <ChoiceSelection pollId={this.state.pollId} choices={_.keys(this.state.choices)} />
          </Col>
          <Col md={6}>
            <PollChart rawData={this.state.choices} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

