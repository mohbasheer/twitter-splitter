## Details
Twitter Splitter created using ReactJS and used Mocha Enzyme Expect for testing. Tested only in Node Version 8.
## Tweet Component
React Simple component. Which will render a given tweet.
## TweetList Component
React Simple component. It will render a list of TweetComponent.
## TweetError Component
React Simple component. It will show given error message otherwise hide.
## PostTweet Component
React State component. It will split and post the larger tweet into smaller tweets with the help of Splitter => getChunks function.
## App Component (Root Component)
React State component. It compose TweetList and PostTweet Components.
## Splitter => getChunks function
It's a core function. It will split the large tweet into smaller tweets.
### Params
@ inputText (string : required)
@ maxWordLength (number : required)
### return
list of smaller tweets
