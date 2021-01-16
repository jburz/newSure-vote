// import necessary packages/modules, pages and components
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Election from './pages/Election'
import Vote from './pages/Vote'
import Contact from './pages/Contact'
import AddPerson from './pages/Signupcamface.jsx'
import SignIn2 from './pages/SignInFace.jsx'
import Ballot from './pages/Ballot'
import GlobalProviderAuthUser from './utils/GlobalContextAuthUser';


function App() {
  return (
    <Router>
      <div className="App">
        <GlobalProviderAuthUser>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/cam2' component={AddPerson} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/election' component={Election} />
            <Route exact path='/cam3' component={SignIn2} />
            <Route exact path='/ballot' component={Ballot} />
            <Route exact path='/vote' component={Vote} />
            <Route exact path='/contact' component={Contact} />
          </Switch>
        </GlobalProviderAuthUser>
      </div>
    </Router >
  );
}

// export App out of App.jsx
export default App;
