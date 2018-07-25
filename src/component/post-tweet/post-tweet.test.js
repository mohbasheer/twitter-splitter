import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import PostTweet from './post-tweet';

function setUp(message) {
    let handlePost = () => { };
    return shallow(<PostTweet handlePost={handlePost}></PostTweet>);
}

// it('render hello tweet', () => {
//     const wrapper = setUp('hello');
//     const mockUserEnteredValue = `React was created by Jordan Walke, a software engineer at Facebook. 
//     He was influenced by XHP, an HTML component framework for PHP.[8] 
//     It was first deployed on Facebook's newsfeed in 2011 and later on Instagram.com in 2012.[9] 
//     It was open-sourced at JSConf US in May 2013.`
//     wrapper.find('textarea').simulate('change', { target: { value: mockUserEnteredValue } });
//     console.log(wrapper.getNoOfChunks);
// });