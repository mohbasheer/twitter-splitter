import expect from 'expect';
import React from 'react';
import { render } from 'enzyme';
import TweetError from './tweet-error';

function setUp(errorMessage) {
    return render(<TweetError error={errorMessage}></TweetError>);
}

it('should render given error message', () => {
    const errorMessage = 'should not be more then 50',
        wrapper = setUp(errorMessage);
    expect(wrapper.text()).toBe(errorMessage);
});

it('should render given error message', () => {
    const wrapper = setUp('');
    expect(wrapper.hasClass('invisible')).toBeTruthy();
    expect(wrapper.text()).toBe('');
});