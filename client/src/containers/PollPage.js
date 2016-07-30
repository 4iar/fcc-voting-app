import React from 'react';
import {connect} from 'react-redux';
import PollChart from '../components/PollChart';

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
      <div key={this.state.pollId}>
        <PollChart rawData={this.state.choices} />
        {this.state.description}
        {this.state.question}
        {this.state.pollId}
      </div>
    );
  }
}

