import { Schema, model } from 'mongoose';

const taskSchema = new Schema({});

const Task = model('User', taskSchema);
export default Task;
