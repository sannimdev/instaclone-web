import { useEffect } from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { isLoggedInVar, logUserOut } from '../apollo';

const ME_QUERY = gql`
    query me {
        me {
            username
            avatar
        }
    }
`;

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data } = useQuery(ME_QUERY, {
        skip: !hasToken,
    });
    console.log(data);
    useEffect(() => {
        if (data?.me === null) {
            logUserOut();
        }
    }, [data]);
    return { data };
}
export default useUser;
