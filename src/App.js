import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import NotFound from './screens/NotFound';
import SignUp from './screens/SignUp';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Profile from './screens/Profile';

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Routes>
                            <Route path="*" element={<NotFound />} />
                            <Route
                                exact
                                path={routes.home}
                                element={
                                    isLoggedIn ? (
                                        <Layout>
                                            <Home />
                                        </Layout>
                                    ) : (
                                        <Login />
                                    )
                                }
                            />
                            <Route
                                path={`/users/:username`}
                                element={
                                    <Layout>
                                        <Profile />
                                    </Layout>
                                }
                            />
                            {!isLoggedIn && <Route path={routes.signUp} element={<SignUp />} />}
                        </Routes>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}

export default App;
