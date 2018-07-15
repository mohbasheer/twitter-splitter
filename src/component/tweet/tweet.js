import React from 'react';
import PropTypes from 'prop-types';

const Tweet = ({ message }) => {
    return (
        <li className="list-group-item">{message}</li>
    );
}

Tweet.propTypes = {
    message: PropTypes.string.isRequired
};

export default Tweet;