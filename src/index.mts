import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRouter.mjs";

config();

const mongoURI = process.env.MONGO_URI || "";
const port = process.env.PORT || 4000;

if (mongoURI === "") {
  throw "mongoURI missing conent in .env";
}

const app = express();

app.use(json());

app.use("/users", userRouter);

app.listen(port, async (error) => {
  try {
    if (error) {
      console.error(error);
    }
    await mongoose.connect(mongoURI);

    console.log(
      "Api is up and running on port: " + port + ", connected to the database",
    );
  } catch (error) {
    console.error(error);
  }
});
