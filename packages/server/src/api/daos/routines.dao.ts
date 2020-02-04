import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true }
},
  {
    timestamps: true,
    usePushEach: true
  }
);

export const Routine = mongoose.model<mongoose.Document>("routine", schema);