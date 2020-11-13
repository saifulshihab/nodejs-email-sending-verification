import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dash" component={Dashboard} />
    </>
  );
};

export default App;