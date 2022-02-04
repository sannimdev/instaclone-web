import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';

const Title = styled.h1`
    color: blue;
    font-size: 3rem;
`;
const Container = styled.div`
    background-color: tomato;
`;

const Login = () => {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
        </Container>
    );
};

export default Login;
