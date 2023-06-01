import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 25,
      index: true,
    },
    name: {
      type: String,
      maxLength: 40,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      match: /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/,
    },
    password: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

const User = model('User', userSchema);
export default User;
