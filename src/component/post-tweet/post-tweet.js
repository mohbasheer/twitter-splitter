import React from 'react';
import TweetError from './tweet-error';
import PropTypes from 'prop-types';
import { getSplittedChunks } from './splitter';
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
    handleChange(event) {
        this.setState({ tweet: event.target.value });
        this.validateTweetMessage();
    }
    handlePost() {
        this.props.handlePost(getSplittedChunks(this.state.tweet, MAX_WORD_LENGTH));
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
                <div className="input-group send-tweet">
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