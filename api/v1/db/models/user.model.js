const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: [{
            type: String,
            enum: ["admin", "product_manager"]
        }],
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for the creator
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
