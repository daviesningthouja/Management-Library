// models/usageLogs.model.js
const mongoose = require('mongoose');

const usageLogsSchema = new mongoose.Schema({
    userId: {
        type:String,
        ref: 'User',
        required: true,
    },
    
    name:{
        type:String,
        ref:'User',
    },
    action: {
        type: String,
        required: true,
        enum: ['borrow', 'return', 'renew', 'overdue', 'Student logged in'], // You can define different actions
    },
    details: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const UsageLogs = mongoose.model('UsageLogs', usageLogsSchema);

module.exports = UsageLogs;
