import mongoose from "mongoose";

const connection = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.error(`error connecting to mongodb, error: ${error}`);
  });

export default connection;
