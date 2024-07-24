const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios= require("axios");
const amqplib = require("amqplib");

const { APP_SECRET, MESSAGE_BROKEER_URL, EXCHANGE_NAME } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

// module.exports.PublishCustomerEvent = async(payload) =>{

//   //perform Some operations
//   axios.post('http://localhost:7000/customers/app-events',{
//     payload
//   })
// }

// module.exports.PublishShoppingEvent = async(payload) => {
//   //Perform Some operations
//   axios.post('http://localhost:7000/shopping/app-events',{
//     payload
//   })
// }


//To create a message broker


 
//Create a channel

module.exports.CreateChannel = async()=>{
  try {
    const connection = await amqplib.connect(MESSAGE_BROKEER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
  
    return channel;
  } catch (error) {
    console.error("Failed to create channel:", error); 
    throw error;
  }
};

//publish a message

module.exports.PublishMessage = async(channel,service,message)=>{
 try {
  await channel.publish(EXCHANGE_NAME, service, Buffer.from(message));
  console.log("Message has been sent"+ message);
} catch (error) {
  console.error("Failed to publish message:", error);
  throw error;
}
};
//Subscribe to messages
// module.exports.SubscribeMessage = async (channel, service, binding_key) => {

//   const appQueue = await channel.assertQueue(QUEUE_NAME, { durable: true });
//   channel.bindQueue((appQueue.queue, EXCHANGE_NAME, binding_key));

//   channel.consume(appQueue.queue, data =>{
//     console.log('received message');
//     console.log(data.content.toString());
//     channel.ack(data);
//   })
// }