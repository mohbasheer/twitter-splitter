import React from 'react';
import TweetList from './tweet-list/tweet-list';
import PostTweet from './post-tweet/post-tweet';
import './app.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tweets: ["abc", "abc12", "ab1c", "11abc", 'aaxx']
        }
        this.handleSend = this.handleSend.bind(this);
    }
    handleSend(tweet) {
        this.setState({ tweets: [...this.state.tweets, tweet] });
    }
    render() {
        const tweets = [...this.state.tweets];
        return (
            <div>
                <TweetList tweets={tweets}></TweetList>
                <PostTweet handleSend={this.handleSend}></PostTweet>
            </div>
        );
    }
}

export default App;