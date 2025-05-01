import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  image: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const Project = mongoose.model<IProject>('Project', ProjectSchema); 