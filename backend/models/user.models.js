import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '', // Optional, can be empty initially
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'], // Restrict gender to these values
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;