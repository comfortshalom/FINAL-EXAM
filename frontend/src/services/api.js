
/* Import Axios to make HTTP requests to the backend. */
import axios from 'axios';

/* Create a reusable connection to the UNI-FIND backend API. */
const api = axios.create({
  /* Backend address and API base path. */
  baseURL: 'http://localhost:5001/api',

  /* Set the request content type to JSON. */
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Export the API connection for use in other files. */
export default api;
