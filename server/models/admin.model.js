const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter admin name'],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        require:true,

    },
    password: {
        type: String,
        required: true
    },
    contact:
    {
        type: String,
        required:true
    }
}, {
    timestamps: true,
});

// Hash the password before saving admin
AdminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Method to compare the password for authentication
AdminSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
