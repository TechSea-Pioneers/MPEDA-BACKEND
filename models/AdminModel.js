import mongoose from 'mongoose';
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  password: String,
  date: { type: Date, default: Date.now },
});
export const AdminModel = mongoose.model('Admin',AdminSchema);