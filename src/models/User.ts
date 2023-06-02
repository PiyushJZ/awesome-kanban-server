import { Schema, model } from 'mongoose';
import { mobileRegex, emailRegex } from '@regex';

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
      match: emailRegex,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: (value: string) => {
          mobileRegex.test(value);
        },
      },
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
