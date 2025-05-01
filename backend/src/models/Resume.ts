import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

interface IEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

interface IExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements?: string[];
}

interface ISkill {
  name: string;
  level: number;
  category: string;
}

interface IProject {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

interface IResume extends Document {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    summary: string;
    socialLinks: {
      linkedin?: string;
      github?: string;
      twitter?: string;
    };
  };
  education: IEducation[];
  experience: IExperience[];
  skills: ISkill[];
  projects: IProject[];
  version: number;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String }
});

const ExperienceSchema = new Schema<IExperience>({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String, required: true },
  achievements: [{ type: String }]
});

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true }
});

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  image: { type: String }
});

const ResumeSchema = new Schema<IResume>({
  personalInfo: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    summary: { type: String, required: true },
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String }
    }
  },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [SkillSchema],
  projects: [ProjectSchema],
  version: { type: Number, default: 1 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ResumeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema); 