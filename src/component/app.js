import React from 'react';
import TweetList from './tweet-list/tweet-list';
import SendTweet from './send-tweet/send-tweet';
import './app.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tweets: ["abc", "abc12", "ab1c", "11abc", 'aaxx']
        }
    }
    render() {
        return (
            <div>
                <TweetList tweets={this.state.tweets}></TweetList>
                <SendTweet></SendTweet>
            </div>
        );
    }
}

export default App;