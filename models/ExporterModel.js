import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  }, // String is shorthand for {type: String}
  about: {
    type: String,
    required: true,
    unique:true
  },
  infrastructure: {
    type: String,
    required: true
  },products: {
    type: String,
    required: true
  },
  email: {
    type:String,
    default:false
  },
  website: {
    type:String,
    default:false
  },
  date: { type: Date, default: Date.now },
});
const ExporterModel = mongoose.model('Exporter',UserSchema);
export default ExporterModel;