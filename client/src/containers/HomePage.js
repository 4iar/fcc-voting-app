import React from 'react';
import {Col, Grid, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';

function getState(state) {
  return {
    polls: state.app.polls
  };
}

@connect(getState)
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: this.props.polls
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      polls: newProps.polls
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <div>
              <ListGroup>
                {this.state.polls.map((poll) => {
                  const url = '/poll/' + poll.id;
                  return (
                    <LinkContainer key={poll.id} to={{pathname: url}}>
                      <ListGroupItem header={poll.question}>
                        {poll.description}
                      </ListGroupItem>
                    </LinkContainer>
                  );
                })}
              </ListGroup>
            </div>
          </Col>
          <Col md={2}/>
        </Row>
      </Grid>
    );
  }
}
