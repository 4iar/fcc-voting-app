import React from 'react';
import Select from 'react-select';
import {Button, FormGroup} from 'react-bootstrap';
import $ from 'jquery';

import 'react-select/dist/react-select.css';

export default class ChoiceSelection extends React.Component {
  render() {
    const options = this.props.choices.map((choice) => {
      return {value: choice, label: choice}
    });

    function handleClick(e) {
      e.preventDefault();  // stop redirection on form submit
      // POST the form
    }

    return (
      <div>
        <form>
          <FormGroup>
            <Select
              name="choice"
              value="one"
              options={options}
              allowCreate={true}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" onClick={handleClick}>Submit</Button>
          </FormGroup>
        </form>
      </div>


    )
  }
}
