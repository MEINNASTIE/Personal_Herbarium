import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        enum: ['default', 'dark', 'green'], // change later theme names accordingly
        default: 'default',
      },
    plants: [{ type: Schema.Types.ObjectId, ref: 'Plant' }]
});
const User = mongoose.model('User', userSchemas);
    
export default User;
