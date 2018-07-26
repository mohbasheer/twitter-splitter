import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import PostTweet from './post-tweet';
import { MAX_WORD_LENGTH } from './constant';

function setUp() {
    let handlePost = () => { };
    return shallow(<PostTweet handlePost={handlePost} />);
}

describe('Validate PostTweet Component', () => {
    describe('Validate Tweet', () => {
        it('should be valid', () => {
            const wrapper = setUp(),
                wrapperIns = wrapper.instance();
            wrapper.find('textarea').simulate('change', { target: { value: 'small' } });
            expect(wrapperIns.isPostValid()).toBeTruthy();
        });

        it('should be invalid', () => {
            const wrapper = setUp(),
                wrapperIns = wrapper.instance();
            wrapper.find('textarea').simulate('change', { target: { value: 'bigggggggggggggggggggggggggggdataaaaaaaaaaaaaaaaaaa' } });
            expect(wrapperIns.isPostValid()).toBeFalsy();
        });
    });
    it('should reset the input field', () => {
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
        expect(wrapperIns.getErrorMessage()).toBe(`A word can't be more ${MAX_WORD_LENGTH} character "${value}" please split the word`);
    });
});

