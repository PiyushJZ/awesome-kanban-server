import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    createdAt: {
      type: Date,
      immutable: true,
    },
  },
  { timestamps: true }
);

const Project = model('User', projectSchema);
export default Project;
