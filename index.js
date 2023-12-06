const mongoose = require('mongoose');
const { response } = require("express");
mongoose.connect("mongodb+srv://dbUser:wPkE66GW7KYIv0CS@instanciadesarrolloweb.gsu4aje.mongodb.net/?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("Connected to DB")});

const { gql } = require('apollo-server');
const typeDefs = gql`
  type Client {
    id: ID!,
    name: String,
    lastName: String,
    email: String,
    address: String,
    phone: String,
    password: String,
  }
  type Order {
    id: ID!,
    date: String,
    client: Client,
    status: String,
  }

  type Mutation {
    addClient(name: String, lastName: String, email: String, address: String, phone: String, password: String): Client
    addOrder(date: String, client: ID!, status: String): Order
    login(email: String, password: String): Client
  }

  type Query {
    clients: [Client]
    orders: [Order]
  }
`;
const { ApolloServer } = require('apollo-server');

const clientSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  password: String,
});
const Client = mongoose.model('Client', clientSchema);

const orderSchema = new mongoose.Schema({
  date: String,
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  status: String,
});
const Order = mongoose.model('Order', orderSchema);

const resolvers = {
  Client: {
    id: (client) => client._id.toString(),
  },
  Order: {
    id: (order) => order._id.toString(),
    client: async (order) => {
      return await Client.findById(order.client);
    },
  },
  Mutation: {
    addClient: async (_, { name, lastName, email, address, phone, password }) => {
      const client = new Client({ name, lastName, email, address, phone, password });
      await client.save();
      return client;
    },
    addOrder: async (_, { date, client, status }) => {
      const order = new Order({ date, client, status });
      await order.save();
      return order;
    },
  },
  Query: {
    clients: async () => {
      return await Client.find();
    },
    orders: async () => {
      return await Order.find().populate('client');
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});