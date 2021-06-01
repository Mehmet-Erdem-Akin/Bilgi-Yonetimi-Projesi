const { gql } = require("apollo-server");

module.exports = gql `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    age: String!
    city: String!
    country: String!
    adress: String!
    username: String!
    email: String!
    token: String
    createdAt: String!
    order: [Order]
  }
  type Product {
    id: ID!
    name: String!
    description: String!
    image: String
    price: String!
    order: [Order!]
  }
  type Order {
    id: ID!
    order_status: String!
    order_started_date: String!
    user: User
    product: Product
  }
  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getProducts: [Product]!
    allOrders: [Order!]! 
    myProfile: User! 
    checkToken: User
    getUserPublicProfile(token: String!): User! 

  }
  type Mutation {
    register(
      firstName: String!
      lastName: String!
      age: String!
      city: String!
      country: String!
      adress: String!
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    
    createProduct(
      name: String!
      description: String!
      image: String!
      price: String!
    ):Product!

    createOrder(
      order_status: String!
      userId: Int!
      productId: Int!
      order_started_date: String!
    ):Order!
  }
`;