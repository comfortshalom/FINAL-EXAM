
// Import React's StrictMode to help identify potential problems during development.
import { StrictMode } from 'react';

// Import createRoot to render the React application inside the root HTML element.
import { createRoot } from 'react-dom/client';

// Import the UNI-FIND shared colour variables.
import './styles/variables.css';

// Import the UNI-FIND global styling.
import './styles/global.css';

// Import the main application component.
import App from './App.jsx';

// Render the UNI-FIND application.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
