/*---------------------------------/
   IMPORTING MODULES, COMPONENTS t
/---------------------------------*/

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import Authenticated from './components/Authenticated';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Connect components to Context

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const AuthWithContext = withContext(Authenticated);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

/*---------------------------------/
APP MAIN CONTAINER STATEFUL COMPONENT
       renders components
/---------------------------------*/

class App extends React.Component {
  render() {
    return (
    <Router>
      <div className="App">
        <HeaderWithContext/>
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <Route path="/notfound" component={NotFound}/>
          <Route path="/forbidden" component={Forbidden}/>
          <Route path="/error" component={UnhandledError}/>
          <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} /> 
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;