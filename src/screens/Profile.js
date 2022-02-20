import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { PHOTO_FRAGMENT } from '../fragments';

// seeProfile에서 id값은 캐싱 시 중요한 식별 수단이다.
const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            id
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

function Profile() {
    const { username } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username,
        },
    });

    console.log(data);
    return 'Profile';
}

export default Profile;
