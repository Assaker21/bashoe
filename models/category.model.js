import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema);
