import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import { isLoggedInVar } from './apollo';

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <div>
            <Router>
                <Switch>
                    <Router path='/' exact>
                        {isLoggedIn ? <Home /> : <Login />}
                    </Router>
                    {/* <Route>
                        <NotFound /> 
                    </Route> */}
                    <Redirect to='/' />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
