import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            comments {
                id
                user {
                    username
                    avatar
                }
                payload
                isMine
                createdAt
            }
            commentNumber
            createdAt
            isMine
            isLiked
        }
    }
`;
function Home() {
    const { data } = useQuery(FEED_QUERY);

    return (
        <div>
            <PageTitle title="Home" />
            {data?.seeFeed?.map((photo) => (
                <Photo
                    key={photo.id}
                    id={photo.id}
                    user={photo.user}
                    file={photo.file}
                    isLiked={photo.isLiked}
                    likes={photo.likes}
                    comments={photo.comments}
                    commentNumber={photo.commentNumber}
                />
            ))}
        </div>
    );
}
export default Home;
