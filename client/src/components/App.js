/*global Auth0Lock */
import React from 'react';
import {Navbar, NavItem, Nav, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import $ from 'jquery';

import {ALL_POLLS_ENDPOINT, BASE_URL} from '../constants/endpoints';
import {setPolls} from '../actions/appActions';


function getState(state) {
  return {
    user: state.app.user
  };
}

@connect(getState, {setPolls})
export default class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      user: this.props.user
    };
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

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
    });
  }

  showLogin() {
    const lock = new Auth0Lock('Y0HjKDY8epVefNvJlwcUfvsykX9jckfb', 'fcc-voting-app-4iar.auth0.com', {
      auth: {
        redirectUrl: BASE_URL + '/callback',
        responseType: 'code',
        params: {
          scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
        }
      }
    });
    
    lock.show();
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
              <LinkContainer to={{ pathname: '/user/' + this.state.user }}>
                <NavItem eventKey={2} href="#">{this.state.user || "Not logged in"}</NavItem>
              </LinkContainer>
              <NavItem onClick={this.showLogin.bind(this)} eventKey={3}>Login button placeholder</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}
