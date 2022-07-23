// Mongoose Models
const Project = require('../models/Projects')
const Client = require('../models/Clients')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql')

//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    })
})

// Projects Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType, resolve(parent, args) {
                return Client.findById(parent.clientId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        }
    }
})

//mutations

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    phone: args.phone,
                    email: args.email
                })
                client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id)
            }
        },
        updateCient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                phone: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        phone: args.phone,
                        email: args.email
                    },
                },
                    { new: true }
                )
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                console.log('args', args)
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                });

                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id)
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectUpdateStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status
                    },
                },
                    { new: true }
                )
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})