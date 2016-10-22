import * as mongoose from 'mongoose';

interface IWonder extends mongoose.Document {
  created: Date;
  name: String;
  xcoor: Number;
  ycoor: Number;
}

let WonderSchema: mongoose.Schema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'A wonder must have a name'
  },
  xcoor: {
    type: Number,
    required: 'A wonder needs an X coordinate'
  },
  ycoor: {
    type: Number,
    required: 'A wonder needs a Y coordinate'
  }
});

export default mongoose.model<IWonder>('Wonder', WonderSchema, null, null);
