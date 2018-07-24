import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import TweetList from './tweet-list';

function setUp(tweets) {
    return mount(<TweetList tweets={tweets}></TweetList>);
}

it('render tweet list', () => {
    const wrapper = setUp([`I can't believe `, `Tweeter now supports chunking`, `my messages, so I don't have to do it myself.`]);
    expect(wrapper.find('li')).toHaveLength(3);
});