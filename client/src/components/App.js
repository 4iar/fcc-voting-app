import React from 'react';
import {Navbar, NavItem, Nav, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
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
                <LinkContainer to={{ pathname: '/polls'}}>
                <a href="#">Voting App</a>
                </LinkContainer>
              </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                <LinkContainer to={{ pathname: '/newpoll'}}>
                  <Glyphicon glyph="plus"/>
                </LinkContainer>
              </NavItem>
              <NavItem eventKey={2} href="#">Not logged in</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}
