import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        dept: {
            type: String,
            default: null
        },
        password: {
            type: String,
            required: true,
        }
    }
);

const admin = mongoose.model('admin', AdminSchema);

export default admin;