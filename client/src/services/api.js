import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiUrl;

// Get all user data (profile, projects, resume, etc.)
export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Get user resume data
export const getResume = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    // Extract resume-related fields from user data
    const { name, title, summary, education, experience, skills } = response.data;
    return { name, title, summary, education, experience, skills };
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};

// Get user projects
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data.projects || [];
  } catch (error) {
    console.error('Error fetching projects data:', error);
    throw error;
  }
};

// Submit new contact message
export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${API_URL}/user/contact`, contactData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Update user data
export const updateUserData = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/user`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Update specific sections of user data
export const updateProjects = async (projects) => {
  try {
    const response = await axios.put(`${API_URL}/user/projects`, { projects });
    return response.data;
  } catch (error) {
    console.error('Error updating projects:', error);
    throw error;
  }
};

export const updateExperience = async (experience) => {
  try {
    const response = await axios.put(`${API_URL}/user/experience`, { experience });
    return response.data;
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

export const updateSkills = async (skills) => {
  try {
    const response = await axios.put(`${API_URL}/user/skills`, { skills });
    return response.data;
  } catch (error) {
    console.error('Error updating skills:', error);
    throw error;
  }
};

export const createUserData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/user`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating user data:', error);
    throw error;
  }
}; 