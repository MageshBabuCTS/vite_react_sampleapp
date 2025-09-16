import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css';
import { BrowserRouter } from 'react-router';
import './GencApp.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* wrap the root component (the <App /> component in this case) with <BrowserRouter> in the entry file, like main.jsx or index.js. 
    This ensures that the router context is available to all components from the top of the component tree */}
    <BrowserRouter>
    <App />
    </BrowserRouter>    
  </StrictMode>,
)
