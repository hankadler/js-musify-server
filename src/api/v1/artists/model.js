import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  albumIds: {
    type: [String],
    set: (values) => [...new Set(values)]
  },
});

export default mongoose.model("Artist", schema);
