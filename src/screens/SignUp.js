import { gql, useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import { FatLink } from '../components/auth/shared';
import PageTitle from '../components/PageTitle';
import routes from '../routs';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;

function SignUp() {
    const history = useHistory();
    const onCompleted = (data) => {
        const {
            createAccount: { ok, error },
        } = data;
        if (!ok) {
            return;
        }
        history.push(routes.home);
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
    const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' });
    const onSubmitValid = (data) => {
        // 검증에 통과한 입력 양식이 data로 넘어 온다
        if (loading) {
            return false;
        }
        createAccount({ variables: { ...data } });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign Up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register('firstName', { required: 'First Name is Required' })}
                        type="text"
                        placeholder="First Name"
                    />
                    <FormError message={errors?.firstName?.message} />
                    <Input
                        {...register('lastName', { required: 'Last Name is Required' })}
                        type="text"
                        placeholder="Last Name"
                    />{' '}
                    <FormError message={errors?.lastName?.message} />
                    <Input {...register('email', { required: 'Email is Required' })} type="text" placeholder="Email" />
                    <FormError message={errors?.email?.message} />
                    <Input
                        {...register('username', { required: 'Username is Required' })}
                        type="text"
                        placeholder="Username"
                    />{' '}
                    <FormError message={errors?.username?.message} />
                    <Input
                        {...register('password', { required: 'Password is Required' })}
                        type="password"
                        placeholder="Password"
                    />{' '}
                    <FormError message={errors?.password?.message} />
                    <Button
                        type="submit"
                        value={loading ? 'Loading...' : 'Sign Up'}
                        disabled={!formState.isValid || loading}
                    />
                    <FormError message={errors?.result?.message} />
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
}

export default SignUp;
