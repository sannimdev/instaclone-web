import React from 'react';
import { PropTypes } from 'prop-types';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Avatar from '../../components/Avatar';
import { FatText } from '../../components/shared';
import { gql, useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const PhotoContainer = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: 4px;
    margin-bottom: 60px;
    max-width: 615px;
`;
const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`;

function Photo({ id, user, file, isLiked, likes, caption, commentNumber, comments }) {
    const updateToggleLike = (cache, result) => {
        const {
            data: {
                toggleLike: { ok },
            },
        } = result;
        if (ok) {
            // apollo client3 부터 가능
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        return isLiked ? prev - 1 : prev + 1;
                    },
                },
            });
            // const fragmentId = `Photo:${id}`;
            // const fragment = gql`
            //     fragment BullShitName on Photo {
            //         isLiked
            //         likes
            //     }
            // `;
            // const result = cache.readFragment({
            //     id: fragmentId,
            //     fragment,
            // });
            // if ('isLiked' in result && 'likes' in result) {
            //     const { isLiked: cacheIsLiked, likes: cacheLIkes } = result;
            //     // console.log('We got what we wanted');
            //     cache.writeFragment({
            //         id: fragmentId,
            //         fragment,
            //         data: {
            //             isLiked: !cacheIsLiked,
            //             likes: cacheIsLiked ? cacheLIkes - 1 : cacheLIkes + 1,
            //         },
            //     });
            // }
            // console.log(result);
            // console.log('now its time to update the cache pls.');
        }
    };
    const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        // refetchQueries: [{ query: FEED_QUERY }], 전체 쿼리를 가져오기 때문에 좋은 방법은 아님
        update: updateToggleLike,
    });
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.username}`}>
                    <Avatar lg url={user.avatar} />
                </Link>
                <Link to={`/users/${user.username}`}>
                    <Username>{user.username}</Username>
                </Link>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon
                                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
                <Comments
                    photoId={id}
                    author={user.username}
                    caption={caption}
                    commentNumber={commentNumber}
                    comments={comments}
                />
            </PhotoData>
        </PhotoContainer>
    );
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber: PropTypes.number.isRequired,
};

export default Photo;
