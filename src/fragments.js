import { gql } from '@apollo/client';

// 가장 중복되는 영역을 Fragment로 만드는 것이 포인트

export const PHOTO_FRAGMENT = gql`
    fragment PhotoFragment on Photo {
        id
        file
        likes
        commentNumber
        isLiked
    }
`;

export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        id
        user {
            username
            avatar
        }
        payload
        isMine
        createdAt
    }
`;
