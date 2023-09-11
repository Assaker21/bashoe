import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    items: {
      type: [
        {
          id: {
            type: String
          },
          name: {
            type: String,
            required: true
          },
          desc: {
            type: String,
            required: false
          },
          img: {
            type: [String]
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
          },
          variants: {
            type: [
              {
                size: {
                  type: String
                },
                quantity: {
                  type: Number
                }
              }
            ]
          }
        }
      ]
    },

    client: {
      type: {
        contact: {
          type: {
            firstname: {
              type: String
            },
            lastname: {
              type: String
            },
            email: {
              type: String
            },
            phonenumber: {
              type: String
            }
          }
        },
        shippingAddress: {
          country: {
            type: String,
            default: "Lebanon"
          },
          firstname: {
            type: String
          },
          lastname: {
            type: String
          },
          address: {
            type: String
          },
          city: {
            type: String
          },
          phonenumber: {
            type: String
          }
        },
        billingAddress: {
          country: {
            type: String,
            default: "Lebanon"
          },
          firstname: {
            type: String
          },
          lastname: {
            type: String
          },
          address: {
            type: String
          },
          city: {
            type: String
          },
          phonenumber: {
            type: String
          }
        }
      },
      required: true
    },

    done: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Orders", orderSchema);
