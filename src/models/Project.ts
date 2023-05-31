import { Schema, model } from 'mongoose';

const projectSchema = new Schema({});

const Project = model('User', projectSchema);
export default Project;
