import React from 'react';
import Select from 'react-select';
import {Button, FormGroup} from 'react-bootstrap';
import $ from 'jquery';

import {BASE_URL} from '../constants/endpoints';

import 'react-select/dist/react-select.css';

export default class ChoiceSelection extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use endpoint constant -- is annoying because no easy string formatting...
    this.submitVoteEndpoint = BASE_URL + '/api/poll/' + this.props.pollId + '/vote';

    this.localStorageKey = 'votes'
    const voteStore = JSON.parse(localStorage.getItem(this.localStorageKey));

    let choice = '';
    let status = '';
    if (voteStore[this.props.pollId]) {
      choice = voteStore[this.props.pollId];
      status = 'voted';
    }

    this.state = {
      status,
      choice,
    };
  }

  logChange(choice) {
    this.setState({
      choice
    })
  }

  handleSubmit(e) {
    e.preventDefault();  // stop redirection on form submit
    this.setState({
      status: 'loading'
    });

    $.ajax({
      type: 'POST',
      url: this.submitVoteEndpoint,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({'choice': this.state.choice}),
      success: this.handleSubmitSuccess.bind(this),
      error: this.handleSubmitError.bind(this)
    })
      .fail(function() {
      });
  }

  handleSubmitSuccess(data) {
    console.log(data);
    if (data.status === "success") {
      this.props.refresh()
      this.setState({
        status: "voted"
      });

      let voteStore = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (!voteStore) {
        voteStore = {};
      }
      voteStore[this.props.pollId] = this.state.choice;
      localStorage.setItem(this.localStorageKey, JSON.stringify(voteStore));
      // update chart here
    }
  }

  handleSubmitError() {
    this.setState({
      status: "failed"
    })
  }

  render() {
    const options = this.props.choices.map((choice) => {
      return {value: choice, label: choice}
    });

    let buttonText = {
      loading: 'Voting...',
      voted: "Voted",
      failed: "Connection error - try again"
    }[this.state.status];

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <Select
              name="choice"
              value={this.state.choice}
              disabled={"voted" === this.state.status}
              options={options}
              onChange={this.logChange.bind(this)}
              allowCreate={true}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={!this.state.choice || "loading" === this.state.status || "voted" === this.state.status} type="submit">
              {buttonText || "Vote"}
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}
