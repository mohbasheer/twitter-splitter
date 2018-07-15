import React from 'react';
import TweetList from './tweet-list/tweet-list';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tweets: ["abc", "abc12", "ab1c", "11abc", 'aaxx']
        }
    }
    render() {
        return (
            <TweetList tweets={this.state.tweets}></TweetList>
        );
    }
}

export default App;