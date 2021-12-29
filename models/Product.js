const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        required:true
    }
});

const User = mongoose.model('Product', ProductSchema);

module.exports = User;
