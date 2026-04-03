// const mongoose = require("mongoose");
import mongoose from 'mongoose';
import colors from 'colors';
// const colors = require("colors");

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.log('MONGO_URL is not defined. Skipping database connection.'.bgYellow.black);
    return;
  }
  try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDb database ${conn.connection.host}`.bgMagenta.white);
    // mongoose.connection.on('connected', () => {
    //   console.log(`Connected to Database`.bgMagenta.white)
    // })
    // await mongoose.connect(`${process.env.MONGO_URL}`)
  } catch(error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
  // try {
  //   const conn=await mongoose.connect(process.env.MONGO_LOCAL_URI);
  //   console.log(`Mongodb connected ${conn.connection.host}`.bgGreen.white);
  // } catch (error) {
  //   console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  // }
};

// module.exports = connectDB;
export default connectDB;
