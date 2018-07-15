import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MeetupList from './components/MeetupList';
import AddMeetup from './components/AddMeetup';
// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Girls Who Javascript</h1>
          <MeetupList />
          <AddMeetup />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
