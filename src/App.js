import { useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import { darkModeVar, isLoggedInVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
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
        </ThemeProvider>
    );
}

export default App;
