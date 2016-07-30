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

    this.choice = '';
  }
  
  logChange(choice) {
    this.choice = choice;
  }
  
  handleSubmit(e) {
    e.preventDefault();  // stop redirection on form submit
    $.ajax({
      type: 'POST',
      url: this.submitVoteEndpoint,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({'choice': this.choice})
    })
      .done(function(data) {
      })
      .fail(function(jqXhr) {
      });
  }

  render() {
    const options = this.props.choices.map((choice) => {
      return {value: choice, label: choice}
    });
    
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup>
            <Select
              name="choice"
              value="one"
              options={options}
              onChange={this.logChange.bind(this)}
              allowCreate={true}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
      </div>


    )
  }
}
