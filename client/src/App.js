import React from 'react';
import { Route } from 'react-router-dom';
import CreateNewPassword from './components/createNewPassword';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/forgotpassword';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dash" component={Dashboard} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/createNewPassword/:token" component={CreateNewPassword} />
    </>
  );
};

export default App;
