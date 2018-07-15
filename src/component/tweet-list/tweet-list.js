import React from 'react';
import PropTypes from 'prop-types';
import Tweet from '../tweet/tweet';

const TweetList = ({ tweets }) => {
    return (
        <ul class="list-group">
            {tweets.map((tweet, index) => <Tweet key={index} message={tweet}></Tweet>)}
        </ul>
    );
}

TweetList.propTypes = {
    tweets: PropTypes.array.isRequired
}

export default TweetList;