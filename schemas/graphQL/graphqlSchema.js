const graphql = require("graphql")
const mongoose = require("mongoose")
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLSchema } = graphql

// Import of the Product MongoDB Schema
const Product = require("./mongoDB/productSchema")

// Definition of how a product will look like
const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        category: { type: GraphQLString },
        imageName: { type: GraphQLString },
        name: { type: GraphQLString },
        tag: { type: GraphQLString },
        description: { type: GraphQLString },
    })
})

// Root Queries For Showing Specific Or All Products
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id)
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            }
        }
    }
})


// Mutations for Adding, Removing and Updating products
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                price: { type: GraphQLString },
                category: { type: GraphQLString },
                imageName: { type: GraphQLString },
                tag: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parent, args) {
                const product = new Product({
                    name: args.name,
                    price: args.price,
                    category: args.category,
                    imageName: args.imageName,
                    tag: args.tag,
                    description: args.description,
                })
                return product.save()
            }
        },
        removeProduct: {
            type: ProductType,
            args: {
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Product.findByIdAndRemove(args._id)
            }
        }
    }
})

// Exporting queries and mutations as a GraphQL schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})