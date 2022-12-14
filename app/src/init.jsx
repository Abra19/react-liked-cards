import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App.jsx';

const init =  () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  return root.render(
    <App />
  );
};

export default init;
