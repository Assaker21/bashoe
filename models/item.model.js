import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false
    },
    img: {
      type: [String],
      default: ["https://lb.mikesport.com/cdn/shop/products/657a9c5a0d74bf15861c2c1672e70995.png?v=1689220793&width=1946"]
    },
    price: {
      type: Number,
      default: 1199.99
    },
    sizes: {
      type: [String]
    },
    cat: {
      type: String
    },
    brand: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Item", itemSchema);
