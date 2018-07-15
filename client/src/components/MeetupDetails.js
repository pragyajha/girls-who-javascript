import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMeetupQuery } from '../queries/queries';

class MeetupDetails extends Component {
    displayMeetupDetails(){
        const { meetup } = this.props.data;
        if(meetup){
            return(
                <div>
                    <h2>Meetup Details</h2>
                    <h3><u>Name</u> : { meetup.name }</h3>
                    <h3><u>Venue</u>: { meetup.venue }</h3>
                    <h3><u>Date</u> : { meetup.date }</h3>
                    <h3><u>Speaker Name:</u> { meetup.speaker.name }</h3>
                    <h3>All meetups by this speaker:</h3>
                    <ul className="other-meetups">
                        { 
                            meetup.speaker.meetups.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return( <div>No meetup selected...</div> );
        }
    }
    render(){
        return(
            <div id="meetup-details">
                { this.displayMeetupDetails() }
            </div>
        );
    }
}

export default graphql(getMeetupQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.meetupId
            }
        }
    }
})(MeetupDetails);
