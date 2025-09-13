const http = require(`http`);
const { Server } = require(`socket.io`);
const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`);
dotenv.config({ path: `./config.env` });

process.on(`uncaughtException`, (err) => {
  console.log(`Uncaught Exception! Shutting down.....`);
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require(`./app`);

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
    credentials: true,
  },
});
app.set(`socketio`, io);

const DB = process.env.DATABASE.replace(
  `<PASSWORD>`,
  process.env.DATABASE_PASSWORD
);
port=3000;
mongoose.connect(DB).then(() => console.log(`Connected to DB`));

const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}`);
});


process.on(`unhandledRejection`, (err) => {
  console.log(`Unhandled Rejection! Shutting down.....`);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});