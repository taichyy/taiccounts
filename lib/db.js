import mongoose from "mongoose";

const connect = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("DB connected")
  } catch (error) {
    throw new Error("Connection error")
  }
}

export default connect