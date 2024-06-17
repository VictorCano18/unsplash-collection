import React from 'react'
import ReactDOM from 'react-dom/client'
import ImageProvider from './context/imageContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>
)
