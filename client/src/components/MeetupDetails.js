import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getMeetupQuery } from '../queries/queries';

class MeetupDetails extends Component {
    displayMeetupDetails(){
        const { meetup } = this.props.data;
        if(meetup){
            return(
                <div>
                    <h2>{ meetup.name }</h2>
                    <p>{ meetup.venue }</p>
                    <p>{ meetup.speaker.name }</p>
                    <p>All meetups by this speaker:</p>
                    <ul className="other-meetups">
                        { meetup.speaker.meetups.map(item => {
                            return <li key={item.id}>{ item.name }</li>
                        })}
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
