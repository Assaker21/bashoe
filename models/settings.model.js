import mongoose from "mongoose";
const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    shippingFee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingSchema);
