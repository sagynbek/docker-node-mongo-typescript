import mongoose from "mongoose";

// in seconds
const RECONNECT_TO_DB_ON_FAIL = 3;
// If started from Docker, then DB_HOST would the name of **db service**
const DB_HOST = process.env.DB_HOST || "localhost";
const MONGO_PORT = 27017;
const connection = `mongodb://${DB_HOST}:${MONGO_PORT}/docker-node-mongo`;


const connectDb = () => {
  mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("DB connected");
    })
    .catch((ex) => {
      console.error("Could not connect to DB", ex);
      console.log(`Retry in ${RECONNECT_TO_DB_ON_FAIL} seconds`);

      // Reconnect after ${RECONNECT_TO_DB_ON_FAIL} seconds if failed if failed
      setTimeout(() => {
        console.log("Retrying to connect to DB...");
        connectDb();
      }, RECONNECT_TO_DB_ON_FAIL * 1000);
    })
};

export default connectDb;
