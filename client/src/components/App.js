/*global Auth0Lock */
import React from 'react';
import {Navbar, NavItem, Nav, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import $ from 'jquery';

import {ALL_POLLS_ENDPOINT, BASE_URL, USER_INFO_ENDPOINT} from '../constants/endpoints';
import {setPolls, login, logout} from '../actions/appActions';


function getState(state) {
  return {
    user: state.app.user
  };
}

@connect(getState, {setPolls, login, logout})
export default class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      user: this.props.user
    };
  }

  componentDidMount() {
    this.requestAllPolls = $.get(ALL_POLLS_ENDPOINT, function (result) {
      this.props.setPolls(result);
    }.bind(this));

    this.requestUserInfo = $.get(USER_INFO_ENDPOINT, function (result) {
      if (result.status === "success") {
        this.props.login(result.user, result.id);
      } else {
        this.props.logout;
      }
    }.bind(this));
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user
    });
  }

  componentWillUnmount() {
    this.requestAllPolls.abort();
    this.requestUserInfo.abort();
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
                <a href={BASE_URL + "/polls"}>Voting App</a>
              </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.user &&
              <NavItem eventKey={1}>
                <LinkContainer to={{ pathname: '/newpoll'}}>
                  <Glyphicon glyph="plus"/>
                </LinkContainer>
              </NavItem>
              }
              {!this.state.user && 
                <NavItem onClick={this.showLogin.bind(this)} eventKey={2}>Login</NavItem>
              }
              {this.state.user && 
              <LinkContainer to={{ pathname: '/mypolls' }}>
                <NavItem eventKey={2} href="#">{this.state.user}</NavItem>
              </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}
