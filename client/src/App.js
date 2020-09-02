import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './componants/layout/Navbar';
import Register from './componants/auth/Register';
import Profiles from './componants/profiles/Profiles';
import Search from './componants/profiles/Search';
import Profile from './componants/profile/Profile';
import EditProfile from './componants/profile/EditProfile';
import Alert from './componants/layout/Alert';
import NotFound from './componants/layout/NotFound';
import MOCK from './componants/layout/MOCK';


import 'react-bootstrap';

import { Provider } from 'react-redux'; 
import store from './store';

import './App.css';


const App = () => {
    return (

        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="cont">
                        <section className="container">
                            <Alert/>
                            <Switch>
                                <Route exact path='/' component={Profiles} />
                                <Route exact path='/mock' component={MOCK} />
                                <Route exact path='/register' component={Register} />
                                <Route path='/edit-profile/:id' component={EditProfile} />
                                <Route path='/profile/:id' component={Profile} />
                                <Route path='/:userName' component={Search} />
                                <Route component={NotFound} />
                            </Switch>
                        </section>
                    </div>
                </Fragment>
            </Router>
        </Provider>
        
    );
}

export default App;
