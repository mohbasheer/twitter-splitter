import React from 'react';
import PropTypes from 'prop-types';

const TweetError = ({ error }) => {
    let show = error && error.length,
        styleStr = show ? 'alert alert-danger' : 'invisible';
    return (
        <div className={styleStr} role="alert">
            {error}
        </div>
    );
}

TweetError.propTypes = {
    error: PropTypes.string
}


export default TweetError;