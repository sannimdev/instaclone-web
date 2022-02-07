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
import FormError from '../components/auth/FormError';

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Login = () => {
    const { register, handleSubmit, watch, formState } = useForm({ mode: 'onChange' });
    const onSubmitValid = (data) => {
        console.log(data);
    };
    // const onSubmitInvalid = (data) => {
    //     console.log(data, 'invalid');
    // };
    const { errors } = formState;
    watch();
    return (
        <AuthLayout>
            <PageTitle title="Log in" />
            <FormBox>
                <div>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </div>
                <form onSubmit={handleSubmit(onSubmitValid /*, onSubmitInvalid */)}>
                    <Input
                        {...register('username', {
                            required: 'Username is required',
                            minLength: {
                                value: 5,
                                message: 'Username should be longer than 5 chars.',
                            },
                            // pattern 정규표현식
                            // validate: (currentValue) => currentValue.includes('potato'),
                        })}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(errors?.username?.message)}
                    />
                    <FormError message={errors?.username?.message} />
                    <Input
                        {...register('password', { required: 'Password is required' })}
                        type="password"
                        placeholder="Password"
                        hasError={Boolean(errors?.password?.message)}
                    />
                    <FormError message={errors?.password?.message} />
                    <Button type="submit" value="Log in" disabled={!formState.isValid} />
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
