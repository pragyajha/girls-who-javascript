import { gql } from 'apollo-boost';

const getSpeakersQuery = gql`
    {
        speakers {
            name
            id
        }
    }
`;

const getMeetupsQuery = gql`
    {
        meetups {
            name
            id
        }
    }
`;

const addMeetupMutation = gql`
    mutation AddMeetup($name: String!, $venue: String!, $date: String!,$speakerId: ID!){
        addMeetup(name: $name, venue: $venue, date: $date, speakerId: $speakerId){
            name
            id
        }
    }
`;

const getMeetupQuery = gql`
    query GetMeetup($id: ID){
        meetup(id: $id) {
            id
            name
            date
            venue
            speaker {
                id
                name
                company
                meetups {
                    name
                    id
                }
            }
        }
    }
`;

export { getSpeakersQuery, getMeetupsQuery, addMeetupMutation, getMeetupQuery };
