const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter user name'],
    },
    enrollmentId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v); // Basic email regex validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: ['Computer Science', 'Electrical', 'Mechanical', 'Civil','Electronic & Communication'],
        // required: true
    },
    contact: {
        type: String,
        
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Ensures the contact is a 10-digit number
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        }
    },
    qrCodeUrl: {
        type: String, // Field to store QR code URL
    },
    category: {
        type: String,
        enum: ['SC', 'ST', 'OBC', 'General'],
        //required: true
    },
    fcmToken: { type: String },
    
    borrowedBooks: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        isbn: {
            type: String,
        },
        tag: {
            type: String, // For filtering by category/tag (e.g., 'Computer Science')
          },
        borrowedDate: {
            type: Date,
            default: Date.now
        }
    }]
},

    {
        //krm knda create twbno krm knda update twbno do sina utpa yduiba
        timestamps: true,
    }
);

UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        try {
            // Hash password if modified
            if (this.isModified('password')) {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
            }

            // Generate QR Code URL
            const qrCodeData = JSON.stringify({
                name: this.name,
                enrollmentId: this.enrollmentId,
                email: this.email,
                contact: this.contact
            });
            const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
            this.qrCodeUrl = qrCodeUrl;

            return next();
        } catch (error) {
            return next(error);
        }
    }
    next();
});

UserSchema.methods.comparePassword = function(candidatePassword) {
return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User",UserSchema)
module.exports = User;