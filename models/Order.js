const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    cart: {
        totalCost: {
          type: Number,
          default: 0,
          required: true,
        },
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
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
});


module.exports = mongoose.model("Order", orderSchema);