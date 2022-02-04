import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
function App() {
    const isLoggedIn = true;
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
