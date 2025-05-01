import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://resume-portfolio-backend.onrender.com/api';

export interface User {
  name: string;
  email: string;
  title: string;
  about: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
  }>;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    link: string;
    image: string;
  }>;
}

export const getUserData = async (): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (data: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/user`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const createUserData = async (data: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/user`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating user data:', error);
    throw error;
  }
}; 