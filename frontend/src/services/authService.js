
/* Import the shared API connection. */
import api from './api';

/* Create a service for authentication requests. */
const authService = {

  /* Send the user's email and password to the backend. */
  login: async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    /* Return the backend response data. */
    return response.data;
  },

  /* Register a new student using the registration details. */
  register: async (fullName, email, accessNumber, password) => {
    const response = await api.post('/auth/register', {
      full_name: fullName,
      email,
      student_number: accessNumber,
      password,
    });

    /* Return the backend registration response. */
    return response.data;
  },

};

/* Export the authentication service. */
export default authService;
