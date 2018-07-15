import React from 'react';
import TweetError from './tweet-error';
import PropTypes from 'prop-types';

class SendTweet extends React.Component {
    constructor() {
        super();
        this.state = {
            tweet: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
        this.setState({ tweet: event.target.value });
    }
    handleClick() {
        this.props.handleSend(this.state.tweet);
        this.setState({ tweet: '' });
    }
    render() {
        return (
            <div className="fixed-bottom">
                <TweetError show={true}></TweetError>
                <div className="input-group mb-3 send-tweet">
                    <textarea className="form-control" onChange={this.handleChange} value={this.state.tweet} />
                    <div className="input-group-append">
                        <button onClick={this.handleClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                    </div>
                </div>
            </div>
        );
    }
}

SendTweet.propTypes = {
    handleSend: PropTypes.func.isRequired
}

export default SendTweet;