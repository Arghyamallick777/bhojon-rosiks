const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    module_name: String,
    module_slug: String,
    icon: String,
    visible: Boolean,
    router_link: {
        type: String,
        default: null
    },
    scope: {
        type: [{
            type: String,
            enum: ["all", "view", "add", "update", "delete"]
        }],
        required: true
    },
    child: [{
        menu_label: String,
        icon: String,
        visible: Boolean,
        router_link: String,
        scope: {
            type: String,
            enum: ["view", "add", "update", "delete"]
        }
    }]
});

const permissionSchema = new mongoose.Schema({
    module_name: {
        type: String,
        required: true
    },
    module_slug: {
        type: String,
        required: true
    },
    scopes: [{
        key: {
            type: String,
            enum: ["add", "update", "view", "delete"]
        },
        value: Boolean
    }]
});

const contentOrPermissionSchema = new mongoose.Schema({
    content: { type: [contentSchema], default: undefined },
    permissions: { type: [permissionSchema], default: undefined }
});

const adminConfigSchema = new mongoose.Schema({
    config_type: {
        type: [{
            type: String,
            enum: ["admin_menu", "permission_module"]
        }],
        required: true
    },
    contents: [contentOrPermissionSchema],
    is_active: Boolean
});

module.exports = mongoose.model('adminconfig', adminConfigSchema);
