import { gql, useQuery } from '@apollo/client';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from '../fragments';

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            comments {
                ...CommentFragment
            }
            commentNumber
            createdAt
            isMine
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
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
                    caption={photo.caption}
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
