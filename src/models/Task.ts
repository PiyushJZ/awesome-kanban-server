import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    taskImage: {
      type: Map,
      of: String,
    },
    taskDocument: {
      type: Map,
      of: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    asignee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      immutable: true,
    },
    dueDate: {
      type: Date,
    },
    timeEstimate: {
      type: Number,
    },
    timeSpent: {
      type: [Number],
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Task = model('User', taskSchema);
export default Task;
