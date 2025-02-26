
import axios from 'axios';

// Set default API URL (change it if needed)
const apiUrl = process.env.REACT_APP_API_URL; // URL מתאים לשרת שלך
axios.defaults.baseURL = apiUrl;

// Add a global interceptor for error handling and 401 redirection
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // קריאה מהטוקן שנשמר
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // הוספת הטוקן ל-Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error); // טיפול בשגיאות בבקשה לפני שליחה
  }
);

// Add a global interceptor for error handling and 401 redirection
axios.interceptors.response.use(
  response => response, // Pass successful responses through unchanged
  error => {
    console.error('API Error:', error);

    if (error.response?.status === 401) {
      // Redirect to login page if unauthorized
      alert("Unauthorized access. Please log in again.");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default {
  // Fetch all tasks
  getTasks: async () => {
    try {
      const result = await axios.get('/Tasks'); // EndPoint מותאם
      return result.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Add a new task
  addTask: async (name) => {
    try {
      const result = await axios.post('/Task/', { name, isComplete: false }); // התאמה למבנה הנתונים של השרת
      return result.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update the completion status of a task
  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`/Task/${id}?IsComplete=${isComplete}`);
      return result.data;

    } catch (error) {
      console.error('Error updating task completion:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await axios.delete(`/Task/${id}`); // EndPoint מותאם
      return { success: true }; // מחזיר הצלחה
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

    // Login
    login: async (username, password) => {
      try {
        const result = await axios.post('Login', { username, password });
        return result.data; // יחזיר את הטוקן
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
  
    // Register
    register: async (username, password) => {
      try {
        const result = await axios.post('Register', { username, password });
        return result.data;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    }
};