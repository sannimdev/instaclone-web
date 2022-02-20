import sanitizeHtml from 'sanitize-html';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import React from 'react';

const CommentContainer = styled.div``;
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

function Comment({ author, payload = '' }) {
    const sanitizedHtml = sanitizeHtml(payload.replace(/#[\w]+/g, '<mark>$&</mark>'), {
        allowedTags: ['mark'],
    });
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
        </CommentContainer>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
};

export default Comment;
