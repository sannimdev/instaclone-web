import styled from 'styled-components';
import { darkModeVar } from '../apollo';

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
    font-size: 3rem;
`;
const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

const Login = () => {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => darkModeVar(true)}>To dark</button>
            <button onClick={() => darkModeVar(false)}>To Light</button>
        </Container>
    );
};

export default Login;
