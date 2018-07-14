import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getSpeakersQuery, addMeetupMutation, getMeetupsQuery } from '../queries/queries';

class AddMeetup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            venue: '',
            date: '',
            speakerId: ''
        };
    }
    displaySpeakers(){
        var data = this.props.getSpeakersQuery;
        if(data.loading){
            return( <option disabled>Loading speakers</option> );
        } else {
            return data.speakers.map(speaker => {
                return( <option key={ speaker.id } value={speaker.id}>{ speaker.name }</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        // use the addMeetupMutation
        this.props.addMeetupMutation({
            variables: {
                name: this.state.name,
                venue: this.state.venue,
                date: this.state.date,
                speakerId: this.state.speakerId
            },
            refetchQueries: [{ query: getMeetupsQuery }]
        }).then((data)=>{
            console.log(data);
        });
    }
    render(){
        return(
            <form id="add-meetup" onSubmit={ this.submitForm.bind(this) } >
                <div className="field">
                    <label>Meetup name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Venue:</label>
                    <input type="text" onChange={ (e) => this.setState({ venue: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Date:</label>
                    <input type="text" onChange={ (e) => this.setState({ date: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Speaker:</label>
                    <select onChange={ (e) => this.setState({ speakerId: e.target.value }) } >
                        <option>Select speaker</option>
                        { this.displaySpeakers() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getSpeakersQuery, { name: "getSpeakersQuery" }),
    graphql(addMeetupMutation, { name: "addMeetupMutation" })
)(AddMeetup);
