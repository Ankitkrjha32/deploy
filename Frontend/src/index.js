import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from 'sonner';
import { UserProvider } from './components/Context/UserContext.js'; // Adjust the path as necessary

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </Provider>
);
