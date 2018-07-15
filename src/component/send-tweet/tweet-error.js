import React from 'react';
import PropTypes from 'prop-types';

const TweetError = ({ show }) => {
    let styleStr = show ? 'alert alert-danger' : 'invisible';
    return (
        <div className={styleStr} role="alert">
            A work can't be more then 50 character.
        </div>
    );
}

TweetError.propTypes = {
    show: PropTypes.bool
}


export default TweetError;