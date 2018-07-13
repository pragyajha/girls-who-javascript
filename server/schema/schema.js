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
    {name: 'GirlsWhoJS Meetup#1',date: 'July 1,2017', venue:'HasGeek', id: '1', speakerIds :['1','7']},
    {name: 'GirlsWhoJS Meetup#2',date: 'July 27,2017', venue:'Flipkart', id: '2', speakerIds :['4','11']},
    {name: 'GirlsWhoJS Meetup#3',date: 'Oct 7,2017', venue:'HasGeek', id: '3', speakerIds :['2','5']},
    {name: 'GirlsWhoJS Meetup#4',date: 'Dec 17,2017', venue:'HasGeek', id: '4', speakerIds :['1','3','12']},
    {name: 'GirlsWhoJS Meetup#5',date: 'March 11,2018', venue:'Treebo Hotels', id: '5', speakerIds :['6','8']},
    {name: 'GirlsWhoJS Meetup#6',date: 'May 6,2018', venue:'Treebo Hotels', id: '6', speakerIds :['10','14']},
    {name: 'GirlsWhoJS Meetup#7',date: 'June 10,2018', venue:'HasGeek', id: '7', speakerIds :['6','9','13']},
    {name: 'GirlsWhoJS Meetup#8',date: 'July 15,2018', venue:'Treebo Hotels', id: '8', speakerIds :['1','8','12']}
];

var speakers = [
    {name: 'Adisha Porwal', company:'TypeSet.io', id: '1'},
    {name: 'Anbarasi U', company:'Tesco', id: '2'},
    {name: 'Aparna', company:'Artoo', id: '3'},
    {name: 'Franziska Hinkelmann', company:'Google', id: '4'},
    {name: 'Manjula Dube', company:'BookMyShow', id: '5'},
    {name: 'Nishtha Gupta', company:'Flipkart', id: '6'},
    {name: 'Pavithra', company:'Atlassian', id: '7'},
    {name: 'Pragya Jha', company:'Treebo Hotels', id: '8'},
    {name: 'Rakhi Sharma', company:'The Data Team', id: '9'},
    {name: 'Ruchi Mutneja', company:'Quintype', id: '10'},
    {name: 'Sarah Drasner', company:'Microsoft', id: '11'},
    {name: 'Toshi Gupta', company:'Flipkart', id: '12'},
    {name: 'Varsha Bhagat', company:'Treebo Hotels', id: '13'},
    {name: 'Vidya Ramakrishnan', company:'HasGeek', id: '14'},
];

const MeetupType = new GraphQLObjectType({
    name : 'Meetup',
    fields : () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        date: {type : GraphQLString},
        venue: {type : GraphQLString},
        speakers: {
            type: new GraphQLList(SpeakerType),
            resolve(parent,args){
                console.log(parent);
                return parent.speakerIds.map((speakerId) => 
                    _.find(speakers, {id: speakerId})
                )
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