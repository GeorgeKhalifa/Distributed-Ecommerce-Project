const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const cartSchema = new Schema({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      price: {
        type: Number,
        default: 0,
      },
      title: {
        type: String,
      },
      image:{
          type:String
      }
    },
  ],
  totalCost: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type:Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Cart", cartSchema);