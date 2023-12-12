import mongoose from 'mongoose';
const { Schema } = mongoose;
const PromptSchema = new Schema({
  message: {
    type:String,
    required:true
  }, // String is shorthand for {type: String}
  author: {
    type: String,
    required:true
  },
  date: { type: Date, default: Date.now },
});

const PromptModel = mongoose.model('Prompt', PromptSchema);
export default PromptModel