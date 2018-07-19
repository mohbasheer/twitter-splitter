import React from 'react';
import TweetError from './tweet-error';
import PropTypes from 'prop-types';
import { MAX_WORD_LENGTH } from './constant';

class PostTweet extends React.Component {
    constructor() {
        super();
        this.state = {
            tweet: '',
            invalidWord: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }
    validateTweetMessage() {
        this.setState((state) => {
            let invalidWord = state.tweet.split(' ').filter(word => word.length > MAX_WORD_LENGTH)[0];
            return Object.assign(
                {},
                state,
                { invalidWord }
            )
        });
    }
    /**
     * 
     * @param {*} noOfChunks 
     * Example:
     * noOfChunks = 20
     * max part indicator will be ==> '20/20 '
     * so length of '20/20 ' ==> 6
     */
    getMaxPartIndicatorLength(noOfChunks) {
        return String(noOfChunks).length + 2;
    }
    /**
     * 
     * @param {*} maxWordLength 
     * @param {*} partIndicatorLength 
     * will return final number of chunks to post
     */
    getNoOfChunks(maxWordLength, partIndicatorLength) {
        let tweetList = this.state.tweet.split(' ');
        let noOfChunks = 0, count = 0;
        tweetList.forEach(tweet => {
            count = count + tweet.length;
            if (count >= maxWordLength) {
                noOfChunks++;
                count = 0;
            }
        });

        let newPartIndicatorLength = this.getMaxPartIndicatorLength(noOfChunks);
        if (newPartIndicatorLength !== partIndicatorLength) {
            this.getNoOfChunks(maxWordLength - newPartIndicatorLength, newPartIndicatorLength);
        }
        return noOfChunks;
    }
    handleChange(event) {
        this.setState({ tweet: event.target.value });
        this.validateTweetMessage();
    }
    handlePost() {
        this.props.handlePost(this.state.tweet);
        this.setState({ tweet: '' });
    }
    getErrorMessage() {
        return this.isPostValid() ? '' : `A word cant be more ${MAX_WORD_LENGTH} character "${this.state.invalidWord}" please split the word`
    }
    isPostValid() {
        return !this.state.invalidWord;
    }

    render() {
        return (
            <div className="fixed-bottom">
                <TweetError error={this.getErrorMessage()}></TweetError>
                <div className="input-group mb-3 send-tweet">
                    <textarea className="form-control" onChange={this.handleChange} value={this.state.tweet} />
                    <div className="input-group-append">
                        <button disabled={!this.isPostValid()} onClick={this.handlePost}
                            className="btn btn-outline-secondary" type="button" id="button-addon2">Post</button>
                    </div>
                </div>
            </div>
        );
    }
}

PostTweet.propTypes = {
    handlePost: PropTypes.func.isRequired
}

export default PostTweet;