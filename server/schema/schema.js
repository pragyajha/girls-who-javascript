const graphql = require('graphql');
const _ = require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList
 } = graphql;

//dummy data
var meetups = [
    {name: 'GirlsWhoJS Meetup#1',date: 'July 1,2017', venue:'HasGeek', id: '1', speakerId :'1'},
    {name: 'GirlsWhoJS Meetup#2',date: 'July 27,2017', venue:'Flipkart', id: '2', speakerId :'2'},
    {name: 'GirlsWhoJS Meetup#3',date: 'Oct 7,2017', venue:'HasGeek', id: '3', speakerId :'3'},
    {name: 'GirlsWhoJS Meetup#4',date: 'Dec 17,2017', venue:'HasGeek', id: '4', speakerId :'1'},
    {name: 'GirlsWhoJS Meetup#5',date: 'March 11,2018', venue:'Treebo', id: '5', speakerId :'2'},
    {name: 'GirlsWhoJS Meetup#6',date: 'May 6,2018', venue:'Treebo', id: '6', speakerId :'3'},
    {name: 'GirlsWhoJS Meetup#7',date: 'June 10,2018', venue:'HasGeek', id: '7', speakerId :'1'},
    {name: 'GirlsWhoJS Meetup#8',date: 'July 15,2018', venue:'Treebo', id: '8', speakerId :'2'}
];

var speakers = [
    {name: 'Adisha Porwal', company:'TypeSet.io', id: '1'},
    {name: 'Pragya Jha', company:'Treebo Hotels', id: '2'},
    {name: 'Toshi Gupta', company:'Flipkart', id: '3'},
];

const MeetupType = new GraphQLObjectType({
    name : 'Meetup',
    fields : () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        date: {type : GraphQLString},
        venue: {type : GraphQLString},
        speaker: {
            type: SpeakerType,
            resolve(parent,args){
                console.log(parent);
                return _.find(speakers, {id: parent.speakerId})
            }
        }
    })
});

const SpeakerType = new GraphQLObjectType({
    name : 'Speaker',
    fields : () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        company: {type : GraphQLString},
        meetups: {
            type: new GraphQLList(MeetupType),
            resolve(parent, args){
                return _.filter(meetups,{speakerId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        meetup : {
           type :MeetupType,
           args: { id : {type : GraphQLID}}, 
           resolve(parents, args){
               //code to get from db/other source
               return _.find(meetups, {id: args.id});
           }
        },
        speaker : {
            type :SpeakerType,
            args: { id : {type : GraphQLID}}, 
            resolve(parents, args){
                //code to get from db/other source
                return _.find(speakers, {id: args.id});
            }
        },
        meetups : {
            type : new GraphQLList(MeetupType),
            resolve(parents, args){
                return meetups;
            }
        },
        speakers : {
            type : new GraphQLList(SpeakerType),
            resolve(parents, args){
                return speakers;
            }
        },
    }
});

module.exports = new GraphQLSchema({
 query: RootQuery
});