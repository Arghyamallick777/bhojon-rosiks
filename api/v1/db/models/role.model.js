const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    permissions: [{
        module_name: String,
        module_slug: String,
        scopes: [{
            key: {
                type: String,
                enum: ["add", "update", "view", "delete"]
            },
            value: Boolean
        }]
    }],
    is_editable: {
        type: Boolean,
        default: true
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

const RoleModel = mongoose.model('role', roleSchema);

module.exports = RoleModel;
