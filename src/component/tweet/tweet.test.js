import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Tweet from './tweet';

function setUp(message) {
    return shallow(<Tweet message={message} />);
}

it('render hello tweet', () => {
    const wrapper = setUp('hello');
    expect(wrapper.find('li').text()).toBe('hello');
});