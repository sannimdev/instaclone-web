import { gql, useMutation } from '@apollo/client';
import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import React from 'react';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id) {
            ok
        }
    }
`;

const CommentContainer = styled.div`
    margin-bottom: 7px;
`;
const CommentCaption = styled.span`
    margin-left: 10px;
    mark {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

function Comment({ id, author, payload = '', isMine }) {
    const updateDeleteComment = (cache, result) => {
        const {
            data: {
                deleteComment: { ok },
            },
        } = result;
        if (ok) {
            cache.evict({ id: `Comment:${id}` });
        }
    };
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id,
        },
        update: updateDeleteComment,
    });
    const onDeleteClick = () => {
        deleteCommentMutation();
    };
    // const sanitizedHtml = sanitizeHtml(payload.replace(/#[\w]+/g, '<mark>$&</mark>'), {
    //     allowedTags: ['mark'],
    // });
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <CommentCaption>
                {payload.split(' ').map((word, idx) =>
                    /#[\w]+/.test(word) ? (
                        <React.Fragment key={idx}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={idx}>{word}</React.Fragment>
                    )
                )}
            </CommentCaption>
            {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
        </CommentContainer>
    );
}

// 인스타에서는 자신의 작성글도 댓글처럼 보임
Comment.propTypes = {
    id: PropTypes.number,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    isMine: PropTypes.bool,
};

export default Comment;
