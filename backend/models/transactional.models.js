import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['Credit', 'Debit', 'Cash', 'Other'],  // You can add more payment types if needed
    },
    category: {
        type: String,
        enum: ['saving', 'expense', 'investment'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,  // Optional
        default: 'unknown'
    },
    date: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;