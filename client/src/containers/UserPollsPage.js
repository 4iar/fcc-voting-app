import React from 'react';
import {Col, Grid, Row, ListGroup, ListGroupItem, PageHeader} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import $ from 'jquery';

import {BASE_URL} from '../constants/endpoints';

export default class UserPollsPage extends React.Component {
  constructor(props) {
    super(props);

    this.user = this.props.params.user;
    this.state = {
      polls: []
    }

    this.userPollsEndpoint = BASE_URL + '/api/user/' + this.user + '/polls';
  }

  componentDidMount() {
    this.serverRequest = $.get(this.userPollsEndpoint, function (result) {
      this.setState({
        polls: result
      }, console.log(this.state));
    }.bind(this));
    
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    // TODO: factor this out with HomePage into a dumb component
    let pollsIndex;
    if (!this.state.polls) {
      pollsIndex = (
        <h2>Loading</h2>
      )
    } else {
      pollsIndex = Object.keys(this.state.polls).map((pollId) => {
        const poll = this.state.polls[pollId];
        const url = '/poll/' + poll.id;
        return (
          <LinkContainer key={poll.id} to={{pathname: url}}>
            <ListGroupItem header={poll.question}>
              {poll.description}
            </ListGroupItem>
          </LinkContainer>
        );
      })
    }

    return (
      <Grid>
        <br/>
        <Row>
          <Col mdOffset={2} md={8}>
            <PageHeader>Polls created by {this.user}</PageHeader>
            <div>
              <ListGroup>
                {pollsIndex}
              </ListGroup>
            </div>
          </Col>
          <Col md={2}/>
        </Row>
      </Grid>
    );
  }
}
