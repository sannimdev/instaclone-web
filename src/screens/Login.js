import { useState } from 'react';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import routes from '../routs';
import Separator from './Separator';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const onUsernameChange = (event) => {
        setUsernameError('');
        setUsername(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === '') {
            setUsernameError('Not empty pls.');
        }
        if (username.length < 10) {
            setUsernameError('Too short');
        }
        console.log(username);
    };
    return (
        <AuthLayout>
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit}>
                    {usernameError}
                    <Input onChange={onUsernameChange} value={username} type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit" value="Log in" disabled={username === '' && username.length < 10} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    );
};

export default Login;
