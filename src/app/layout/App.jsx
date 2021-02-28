import React from 'react';
import { Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { StoreProvider } from '../../contexts/StoreContext';
import Register from '../../features/auth/Register';
import SignIn from '../../features/auth/SignIn';
import ForgotPassword from '../../features/auth/ForgotPassword'

import FeedDashboard from '../../features/feed/feedDashboard/FeedDashboard';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import CreatePost from '../../features/newEntry/CreatePost';

import PrivateRoute from './PrivateRoute';
import RestrictiveRoute from './RestrictiveRoute';


function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <NavBar />
        
        <Route exact path='/landingPage' component={HomePage}/>
        <RestrictiveRoute path='/signin' component={SignIn}/>
        <RestrictiveRoute path='/register' component={Register}/>
        <RestrictiveRoute path='/forgot' component={ForgotPassword} />
        <PrivateRoute exact path='/' component={FeedDashboard}/>
        <PrivateRoute path='/createPost' component={CreatePost}/>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
