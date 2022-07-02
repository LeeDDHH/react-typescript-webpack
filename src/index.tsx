'use strict';

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

if (process.env.NODE_ENV === 'development') {
  console.log('development');
  const { worker } = require('./mocks/browser');
  worker.start();
}

const App = () => {
  useEffect(() => {
    const loginAccess = async () => {
      const res = await fetch('/login', { method: 'POST' });
      console.log(res);
    };
    const fetchUserData = async () => {
      const res = await fetch('/user');
      console.log(res);
    };
    loginAccess();
    fetchUserData();
  }, []);
  return <div>Hello world</div>;
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
