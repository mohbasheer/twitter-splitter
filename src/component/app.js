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
                <SendTweet handleSend={this.handleSend}></SendTweet>
            </div>
        );
    }
}

export default App;