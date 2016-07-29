import React from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import $ from 'jquery';

import {ALL_POLLS_ENDPOINT} from '../constants/endpoints';
import {setPolls} from '../actions/appActions';

@connect(null, {setPolls})
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.serverRequest = $.get(ALL_POLLS_ENDPOINT, function (result) {
      console.log(result);
      this.props.setPolls(result);
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }



  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Voting App</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Not logged in</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}
