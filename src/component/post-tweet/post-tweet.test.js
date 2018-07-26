import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import PostTweet from './post-tweet';

function setUp() {
    let handlePost = () => { };
    return shallow(<PostTweet handlePost={handlePost} />);
}

it('isPostValid should return true', () => {
    const wrapper = setUp(),
        wrapperIns = wrapper.instance();
    wrapper.find('textarea').simulate('change', { target: { value: 'small' } });
    expect(wrapperIns.isPostValid()).toBeTruthy();
});

it('isPostValid should return false', () => {
    const wrapper = setUp(),
        wrapperIns = wrapper.instance();
    wrapper.find('textarea').simulate('change', { target: { value: 'bigggggggggggggggggggggggggggdataaaaaaaaaaaaaaaaaaa' } });
    expect(wrapperIns.isPostValid()).toBeFalsy();
});

it('handlePost should reset the input field', () => {
    const wrapper = setUp();
    wrapper.find('textarea').simulate('change', { target: { value: 'some data' } });
    expect(wrapper.state().tweet).toBe('some data');
    wrapper.find('button').simulate('click');
    expect(wrapper.state().tweet).toBe('');
});

it('check error message', () => {
    const wrapper = setUp(),
        value = 'bigggggggggggggggggggggggggggdataaaaaaaaaaaaaaaaaaa',
        wrapperIns = wrapper.instance();
    wrapper.find('textarea').simulate('change', { target: { value } });
    expect(wrapperIns.getErrorMessage()).toBe(`A word can't be more ${50} character "${value}" please split the word`);
});