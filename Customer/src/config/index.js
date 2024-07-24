const dotEnv = require("dotenv");
//const path = require('path');

// if (process.env.NODE_ENV !== "prod") {
//   //const configFile = `./.env.${process.env.NODE_ENV}`;
//   const configFile = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`);
//   console.log(`Loading environment variables from ${configFile}`);
//  // dotEnv.config({ path: configFile });

//  const result = dotEnv.config({ path: configFile });
//   if (result.error) {
//     console.error('Error loading environment variables:', result.error);
//   } else {
//     console.log('Environment variables loaded:', result.parsed);
//   }
// } else {
//   console.log('Loading environment variables from .env');
//   dotEnv.config();
// }

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

dotEnv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Add this line
console.log('PORT:', process.env.PORT); // Add this line
console.log('APP_SECRET:', process.env.APP_SECRET); // Add this line

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MESSAGE_BROKEER_URL: process.env.MESSAGE_BROKEER_URL,
  EXCHANGE_NAME: 'ONLINE_SHOPPING',
  CUSTOMER_BINDING_KEY: 'CUSTOMER_SERVICE',
  QUEUE_NAME: 'SHOPPING_QUEUE'
};
