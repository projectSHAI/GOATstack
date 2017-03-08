import * as mongoose from 'mongoose';

// Mongoose Model the typescript way
// create interface to specift the type
interface IWonder extends mongoose.Document {
  created: Date;
  name: String;
  xcoor: Number;
  ycoor: Number;
}

// Mongoose schema like usual
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

// export default using es6 to import in other files
export default mongoose.model<IWonder>('Wonder', WonderSchema, null, null);
