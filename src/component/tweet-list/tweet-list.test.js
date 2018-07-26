import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import TweetList from './tweet-list';

function setUp(tweets) {
    return shallow(<TweetList tweets={tweets}></TweetList>);
}

it('render tweet list', () => {
    const wrapper = setUp([`I can't believe `, `Tweeter now supports chunking`, `my messages, so I don't have to do it myself.`]);
    expect(wrapper.find('Tweet')).toHaveLength(3);
});