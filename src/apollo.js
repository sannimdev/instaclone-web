import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import routes from './routes';

const TOKEN = 'token';
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

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});
