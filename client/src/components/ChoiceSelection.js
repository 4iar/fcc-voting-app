import React from 'react';
import Select from 'react-select';
import {Button, FormGroup} from 'react-bootstrap';
import $ from 'jquery';

import {BASE_URL} from '../constants/endpoints';

import 'react-select/dist/react-select.css';

export default class ChoiceSelection extends React.Component {
  constructor(props) {
    super(props);

    // TODO: usen endpoint constant -- is annoying because no easy string formatting...
    this.submitVoteEndpoint = BASE_URL + '/api/poll/' + this.props.pollId + '/vote';

    this.choice = '';
  }

  render() {
    const options = this.props.choices.map((choice) => {
      return {value: choice, label: choice}
    });

    function logChange(choice) {
      this.choice = choice;
    }

    function handleSubmit(e) {
      e.preventDefault();  // stop redirection on form submit
      console.log(this.choice);
      console.log(e);
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

    return (
      <div>
        <form onSubmit={handleSubmit.bind(this)}>
          <FormGroup>
            <Select
              name="choice"
              value="one"
              options={options}
              onChange={logChange.bind(this)}
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
