import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMeetupsQuery } from '../queries/queries';
import MeetupDetails from './MeetupDetails';

class MeetupList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayMeetups(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading meetups...</div> );
        } else {
            console.log(data);
            return data.meetups.map(meetup => {
                return(
                    <li 
                    key={ meetup.id } 
                    onClick={ (e) =>
                        this.setState({ selected: meetup.id }) }
                    >
                      { meetup.name }
                    </li>
                );
            })
        }
    }
    render(){
        return(
            <div>
                <ul id="meetup-list">
                    { this.displayMeetups() }
                </ul>
                <MeetupDetails meetupId={ this.state.selected } />
            </div>
        );
    }
}

export default graphql(getMeetupsQuery)(MeetupList);
