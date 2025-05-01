import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export const Contact = mongoose.model<IContact>('Contact', ContactSchema); 