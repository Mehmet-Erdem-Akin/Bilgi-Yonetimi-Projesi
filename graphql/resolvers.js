const bcrypt = require('bcryptjs');
const { User } = require("../models");
const { Product } = require("../models");
const { Order } = require("../models");

const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env.json');
const { Op, where } = require('sequelize');

module.exports = {
    Query: {
        getUsers: async(_, __, context) => {


            try {
                let user;
                if (context.req && context.req.headers.authorization) {
                    const token = context.req.headers.authorization.split('Bearer ')[1]
                    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                        if (err) {
                            throw new AuthenticationError('unauthenticated')
                        }
                        user = decodedToken;
                        console.log(user)
                    })
                }
                const users = await User.findAll(
                    {
                        include: [{
                            model: Order, 
                            as: 'order',
                            include: [{model: Product,as: 'product'}]
                        }]
                    }
                );
                return users;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        getProducts: async(_, __, context) => {


            const products = await Product.findAll({
                include: [{
                    model: Order,
                    as: 'order', 
                }]
            });
            return products;

        },
        login: async(_, args) => {
            const { username, password } = args;
            let errors = {};

            try {
                if (username.trim() === '')
                    errors.username = 'username must not be empty'
                if (password === '') errors.password = 'password must not be empty'

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError('bad input', { errors })
                }

                const user = await User.findOne({
                    where: { username },
                })

                if (!user) {
                    errors.username = 'user not found'
                    throw new UserInputError('user not found', { errors })
                }
                const correctPassword = await bcrypt.compare(password, user.password)

                if (!correctPassword) {
                    errors.password = 'password is incorrect'
                    throw new UserInputError('password is incorrect', { errors })
                }

                const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: 60 * 60 });

                user.token = token;
                myId= user.id;
                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token,
                    myId,
                }
            } catch (err) {
                console.log(err)
                throw err

            }
        },
        allOrders: async(_, __, context) => {



            const orders = await Order.findAll({
               
                //attributes: ['id'],
                include: [{
                    model: User,
                    as: 'user', 
                   /* model: Product,
                    as: 'product', */
                },{
                    model: Product,
                    as: 'product', 
                }]
                
                //relations: ['user', 'product'],
                /*include: [{
                    model: User,
                    //where: { state: Sequelize.col('project.state') }
                }]*/
            });
            return orders;

        },
        
          checkToken: async (_, __, context) => {
            const user = context.user;
            return user;
          },

          myProfile: async (_, {}, context) => {
            const user = await User.findOne({
              where: { id: context.user.id },
              include: [{
                model: Order,
                as: 'order', 
               /* model: Product,
                as: 'product', */
                }]
            });
            return user;
          },
          getUserPublicProfile: async (_, { id }, context) => {
            const users = await User.findOne({
              where: {
                id: id,
              },
              include: [{
                model: Order,
                as: 'order', 
                include: [{model: Product,as: 'product'}]
                }],
            });
            return users;
          },
          
        
        
        


    },

    Mutation: {
        register: async(_, args) => {
            let { firstName, lastName, age, city, country, adress, username, email, password, confirmPassword } = args
            let errors = {}
            try {
                if (email.trim() === '') errors.email = 'email must not be empty';
                if (password.trim() === '') errors.password = 'password must not be empty';
                if (confirmPassword.trim() === '') errors.confirmPassword = 'repeat password must not be empty';
                if (username.trim() === '') errors.username = 'username must not be empty';

                if (password !== confirmPassword)
                    errors.confirmPassword = 'passwords must match';

                /*const userByUsername = await User.findOne({where: {username}});
                const userByEmail = await User.findOne({where: {email}});

                if(userByUsername) errors.username = 'Username is taken.'
                if(userByEmail) errors.email = 'email is taken.'*/

                if (Object.keys(errors).length > 0) {
                    throw errors
                }

                password = await bcrypt.hash(password, 6);

                const user = await User.create({
                    firstName,
                    lastName,
                    age,
                    city,
                    country,
                    adress,
                    username,
                    email,
                    password
                })
                return user

            } catch (err) {
                console.log(err)
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach((e) => (errors[e.path] = `${e.path} is already taken`))
                } else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach((e) => (errors[e.path] = e.message))
                }
                throw new UserInputError('Bad Input', { errors })
            }

        },
        createProduct: async (_, args) => {
            let { name, description, price, /*image*/ } = args
            let errors = {}
            try {

                const product = await Product.create({
                    name,
                    description,
                    price,
                    //image
                })
                return product

            } catch (err) {
                console.log(err)
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach((e) => (errors[e.path] = `${e.path} is already taken`))
                } else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach((e) => (errors[e.path] = e.message))
                }
            }

        },
        createOrder: async(_, args) => {
            let { userId, productId, order_status, order_started_date } = args
            let errors = {}

            /*let order = await Order.findOne({
                where: { userId: user.id, productId: product.id },
              })*/
              

            const order = await Order.create({
                userId,
                productId,
                order_status,
                order_started_date
            })
            return order

        },
        editOrder: async(_, args) => {
            let { orderId, order_status } = args
            let errors = {}
            const edit = await Order.update({order_status: order_status},{
                where: {
                    id: orderId
                }
            })
            /*let order = await Order.findOne({
                where: { userId: user.id, productId: product.id },
              })*/
              
              /*const order = await Order.findOne({
                where: {
                  id: orderId,
                },
                
              });
              
              order.order_status = order_status;
             order = await Order.save()*/

            return edit

        },
        /*createOrder: async (_, args) => {
            let { order_status, order_started_date} = args
            let errors = {}
            try {
                
                const order = await Order.create({
                    order_status, order_started_date
                })
                return order

            }catch(err){
                console.log(err)
                if(err.name === 'SequelizeUniqueConstraintError'){
                    err.errors.forEach((e) => ( errors[e.path] = `${e.path} is already taken`))
                }else if (err.name === 'SequelizeValidationError'){
                    err.errors.forEach((e) => (errors[e.path] = e.message))
                }
            }

        },*/
        /*createOrder: async (_, { productId }, context) => {
            let user = await User.findOne({
              where: {
                id: context.user.id,
              },
            });
            let product = await Product.findOne({
              where: {
                id: productId,
              },
              relations: ['product'],
            });
            //if (!user || !order) return false;
            //if (order.product.id == context.user.id) return false; //admin is not allowed to join the group for now
      
            let newUserOrder = false;
            
              let userOrder = new userOrder();
              userOrder.user = user;
              userOrder.order = order;
              
              newUserOrder = await userOrder.save();
      
            return !!newUserOrder;
          },*/
    }
}