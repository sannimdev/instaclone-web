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
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Login = () => {
    const { register, handleSubmit } = useForm();
    const onSubmitValid = (data) => {
        console.log(data);
    };
    const onSubmitInvalid = (data) => {
        console.log(data, 'invalid');
    };
    return (
        <AuthLayout>
            <PageTitle title="Log in" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
                    <Input
                        {...register('username', {
                            required: 'Username is required',
                            minLength: 5,
                            // pattern 정규표현식
                            // validate: (currentValue) => currentValue.includes('potato'),
                        })}
                        type="text"
                        placeholder="Username"
                    />
                    <Input
                        {...register('password', { required: 'Password is required' })}
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit" value="Log in" />
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
