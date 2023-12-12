import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },phone: {
    type: String,
    required: true
  },
  verified: {
    type:Boolean,
    default:false
  },
  date: { type: Date, default: Date.now },
});
const UserModel = mongoose.model('User',UserSchema);
export default UserModel;