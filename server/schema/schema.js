const graphql = require('graphql');
const _ = require('lodash');
const Speaker = require('../models/speaker');
const Meetup = require('../models/meetup');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
 } = graphql;

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
                return Speaker.findById(parent.speakerId);
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
                return Meetup.find({ speakerId: parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        meetup : {
           type : MeetupType,
           args: { id : {type : GraphQLID}}, 
           resolve(parent, args){
            return Meetup.findById(args.id);
           }
        },
        speaker : {
            type : SpeakerType,
            args: { id : {type : GraphQLID}}, 
            resolve(parents, args){
                return Speaker.findById(args.id);
            }
        },
        meetups : {
            type : new GraphQLList(MeetupType),
            resolve(parents, args){
                return Meetup.find({});
            }
        },
        speakers : {
            type : new GraphQLList(SpeakerType),
            resolve(parents, args){
                return Speaker.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMeetup: {
            type: MeetupType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString)},
                date: {type : new GraphQLNonNull(GraphQLString)},
                venue: {type : new GraphQLNonNull(GraphQLString)},
                speakerId: {type : new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                console.log('addMeetup args:',args)
                let meetup = new Meetup({
                    name: args.name,
                    date: args.date,
                    venue: args.venue,
                    speakerId: args.speakerId
                });
                return meetup.save();
            }
        },
        addSpeaker: {
            type: SpeakerType,
            args: {
                name: {type : GraphQLString},
                company: {type : GraphQLString},
            },
            resolve(parents, args) {
                let speaker = new Speaker({
                    name: args.name,
                    company: args.company,
                });
                return speaker.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
 query: RootQuery,
 mutation: Mutation
});