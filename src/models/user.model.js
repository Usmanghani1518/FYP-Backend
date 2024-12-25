import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure the email is unique
      trim: true,
      lowercase: true, // Convert email to lowercase
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Only allows 'user' or 'admin' as roles
      default: 'user', // Default role is 'user'
    },
    profilePicture: {
      type: String,
      default: '', // Path or URL to the profile picture
    },
  },
  {
    timestamps: true, 
  }
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;
