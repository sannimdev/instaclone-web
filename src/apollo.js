import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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

const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? 'https://instaclone-backend-2022.herokuapp.com/graphql'
            : 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: localStorage.getItem(TOKEN) || '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                keyFields: (obj) => `User:${obj.username}`,
            },
        },
    }),
    credentials: 'include',
});
