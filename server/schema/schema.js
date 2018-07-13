const graphql = require('graphql');
const _ = require('lodash');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
 } = graphql;

//dummy data
var meetups = [
    {name: 'GirlsWhoJS Meetup#1',date: 'July 1,2017', venue:'HasGeek', id: '1'},
    {name: 'GirlsWhoJS Meetup#2',date: 'July 27,2017', venue:'Flipkart', id: '2'},
    {name: 'GirlsWhoJS Meetup#3',date: 'Oct 7,2017', venue:'HasGeek', id: '3'},
    {name: 'GirlsWhoJS Meetup#4',date: 'Dec 17,2017', venue:'HasGeek', id: '4'},
    {name: 'GirlsWhoJS Meetup#5',date: 'March 11,2018', venue:'Treebo', id: '5'},
    {name: 'GirlsWhoJS Meetup#6',date: 'May 6,2018', venue:'Treebo', id: '6'},
    {name: 'GirlsWhoJS Meetup#7',date: 'June 10,2018', venue:'HasGeek', id: '7'},
    {name: 'GirlsWhoJS Meetup#8',date: 'July 15,2018', venue:'Treebo', id: '8'}
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
        venue: {type : GraphQLString}
    })
});

const SpeakerType = new GraphQLObjectType({
    name : 'Speaker',
    fields : () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        company: {type : GraphQLString}
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
    }
});

module.exports = new GraphQLSchema({
 query: RootQuery
});