import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.js";
import Job from "./models/job.js";
import { readFile } from "fs/promises";
dotenv.config();

try {

  //Db Connection
  mongoose.connect(process.env.MONGO_URL);

  //get Jobs data
  const jobsData = JSON.parse(await readFile('./utils/mockData.json'));

  //get user Email
  const user = await User.findOne({ email: "vijay@gmail.com" });

  //prepare final Jobs data
  const jobs = jobsData.map((job) => {
    return {
      ...job,
      createdBy: user._id
    }
  });

  //create jobs
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);

  console.log('Success');
  process.exit(0);
} catch (err) {
  console.log('err : ', err);
  process.exit(1);
};
