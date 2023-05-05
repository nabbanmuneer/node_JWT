const mongoose = require("mongoose");
const validator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const postSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            require: true
        },
        title: {
            type: String,
            require: true,
            unique: true
        },
        name: {
            type: String,
            require: true,
            unique: true
        },
        status: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true,
        },
        createdAt: { type: Date, default: Date.now, index: { expires: 300 } },

    }
)
postSchema.plugin(validator);
module.exports = mongoose.model('postModel', postSchema)