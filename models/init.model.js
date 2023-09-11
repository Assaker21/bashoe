import mongoose from "mongoose";
const { Schema } = mongoose;

const initSchema = new Schema(
  {
    shippingFee: {
      type: Number
    },
    cats: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Init", initSchema);
