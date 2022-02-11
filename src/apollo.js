import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import routes from './routes';

const TOKEN = 'token';
const DARK_MODE = 'dark_mode';
export const isLoggedInVar = makeVar(!!localStorage.getItem(TOKEN));
export const logUserIn = (token) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};
export const logUserOut = (navigate) => {
    localStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    navigate ? navigate(routes.home, { state: null, replace: true }) : window.location.reload();
};

export const darkModeVar = makeVar(!!localStorage.getItem(DARK_MODE));

export const enableDarkMode = () => {
    localStorage.setItem(DARK_MODE, 'enabled');
    darkModeVar(true);
};

export const disableDarkMode = () => {
    localStorage.removeItem(DARK_MODE);
    darkModeVar(false);
};

export const client = new ApolloClient({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://instaclone-backend-2022.herokuapp.com/graphql'
            : 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
});
