const mongoose = require('mongoose');
const QRCode = require('qrcode'); // Import QRCode library

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter book title'],
    },
    author: {
        type: String,
        required: [true, 'Please enter book author'],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    publishedDate: {
        type: Date,
    },
    tag: {
        type: String, // For filtering by category/tag (e.g., 'Computer Science')
        // required: true,
    },
    status: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available',
    },
    qrCodeUrl: {
        type: String, // Field to store QR code URL
    },
    quantity: {
        type: Number,
        required: true,
        min: 0, // Ensure quantity is non-negative
        default: 1, // Default to 1 copy of the book
    },
    borrowedBy: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            enrollmentId: {
                type: mongoose.Schema.Types.String,
                ref: 'User'
            },
            name: {
                type: mongoose.Schema.Types.String,
                ref: 'User'
            },
            email: {
                type: mongoose.Schema.Types.String,
                ref: 'User'
            },
            borrowedDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true,
});

// Generate QR Code URL when a new book is created
BookSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const qrCodeData = JSON.stringify({
                title: this.title,
                author: this.author,
                isbn: this.isbn,
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

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
