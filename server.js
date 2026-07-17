const mongoose = require('mongoose');

const dotenv = require('dotenv');

const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

process.on('uncaughtException', (err) => {
  console.log('UNHANDLE EXECPTION: Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const { type } = require('os');
const app = require('./app');

// console.log(process.env);

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  // app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLE REJECTION: Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
