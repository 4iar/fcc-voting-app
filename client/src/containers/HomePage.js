import React from 'react';
import {Col, Grid, Row, ListGroup, ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {polls: [{id: 40302, description: 'question description', question: 'question title'}]};
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
