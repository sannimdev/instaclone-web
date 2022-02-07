import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Redirect, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Router path="/" exact>
                        {isLoggedIn ? <Home /> : <Login />}
                    </Router>
                    {!isLoggedIn ? (
                        <Router path="/sign-up">
                            <SignUp />
                        </Router>
                    ) : null}
                    <Router>
                        <NotFound />
                    </Router>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
