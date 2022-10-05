import mongoose from "mongoose";

const schema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    validate: [
      {
        validator: async (value) => Number.isInteger(value),
        message: "must be an integer!"
      },
      {
        validator: async (value) => value > 0,
        message: "must be > 0!"
      }
    ]
  },
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model("Song", schema);
