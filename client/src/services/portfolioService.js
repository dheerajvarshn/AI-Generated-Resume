import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config';

const API_URL = config.apiUrl;

// Set auth token for any request
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Get token from cookies and set axios headers
const loadToken = () => {
  const token = Cookies.get('token');
  if (token) {
    setAuthToken(token);
  }
};

// Portfolio services for dashboard
const portfolioService = {
  // Projects CRUD operations
  getAllProjects: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user`);
      return res.data.projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  addProject: async (projectData) => {
    loadToken();
    try {
      const res = await axios.post(`${API_URL}/user/projects/add`, projectData);
      return res.data;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  updateProject: async (id, projectData) => {
    loadToken();
    try {
      const res = await axios.put(`${API_URL}/user/projects/${id}`, projectData);
      return res.data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  deleteProject: async (id) => {
    loadToken();
    try {
      const res = await axios.delete(`${API_URL}/user/projects/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  // Experience CRUD operations
  getAllExperiences: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user`);
      return res.data.experience;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  addExperience: async (experienceData) => {
    loadToken();
    try {
      const res = await axios.post(`${API_URL}/user/experience/add`, experienceData);
      return res.data;
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  },

  updateExperience: async (id, experienceData) => {
    loadToken();
    try {
      const res = await axios.put(`${API_URL}/user/experience/${id}`, experienceData);
      return res.data;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },

  deleteExperience: async (id) => {
    loadToken();
    try {
      const res = await axios.delete(`${API_URL}/user/experience/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  },

  // Education CRUD operations
  getAllEducation: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user/`);
      return res.data.education;
    } catch (error) {
      console.error('Error fetching education:', error);
      throw error;
    }
  },

  addEducation: async (educationData) => {
    loadToken();
    try {
      const res = await axios.post(`${API_URL}/user/education/add`, educationData);
      return res.data;
    } catch (error) {
      console.error('Error adding education:', error);
      throw error;
    }
  },

  updateEducation: async (id, educationData) => {
    loadToken();
    try {
      const res = await axios.put(`${API_URL}/user/education/${id}`, educationData);
      return res.data;
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  },

  deleteEducation: async (id) => {
    loadToken();
    try {
      const res = await axios.delete(`${API_URL}/user/education/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting education:', error);
      throw error;
    }
  },

  // Skills CRUD operations
  getAllSkills: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user/`);
      return res.data.skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  addSkill: async (skillData) => {
    loadToken();
    try {
      const res = await axios.post(`${API_URL}/user/skills/add`, skillData);
      return res.data;
    } catch (error) {
      console.error('Error adding skill:', error);
      throw error;
    }
  },

  updateSkill: async (id, skillData) => {
    loadToken();
    try {
      const res = await axios.put(`${API_URL}/user/skills/${id}`, skillData);
      return res.data;
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  },

  deleteSkill: async (id) => {
    loadToken();
    try {
      const res = await axios.delete(`${API_URL}/user/skills/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  },

  // Contacts operations
  getAllContacts: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user/contacts`);
      return res.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  deleteContact: async (id) => {
    loadToken();
    try {
      const res = await axios.delete(`${API_URL}/user/contacts/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  // Profile data operations
  getProfileData: async () => {
    loadToken();
    try {
      const res = await axios.get(`${API_URL}/user/`);
      return res.data;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    loadToken();
    try {
      const res = await axios.put(`${API_URL}/user`, profileData);
      return res.data;
    } catch (error) {
      console.error('Error updating profile data:', error);
      throw error;
    }
  }
};

export default portfolioService; 