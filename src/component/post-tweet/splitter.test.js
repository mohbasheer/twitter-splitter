import expect from 'expect';
import { MAX_WORD_LENGTH } from './constant';

import {
    getChunks,
    getPartIndicator
} from './splitter';

let getRawtext = list =>
    list
        .map(chunk => {
            let chunkList = chunk.split(' ');
            chunkList.shift();
            return chunkList.join(' ');
        })
        .join(' ');

describe('Validate Splitter => getChunks function', () => {

    it('should return empty string', () => {
        expect(getChunks('', MAX_WORD_LENGTH).toString()).toBe('');
    });

    it('should return valid string', () => {
        expect(getChunks('hello', MAX_WORD_LENGTH).toString()).toBe('hello');
    });

    it('should have valid partIndicators', () => {
        let tweet = `I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.`,
            splittedList = getChunks(tweet, MAX_WORD_LENGTH);
        splittedList.forEach((word, index) => {
            expect(word.split(' ')[0]).toBe(`${index + 1}/${splittedList.length}`);
        });
        expect(getRawtext(splittedList)).toBe(tweet);
    });

    it('should return valid chunks', () => {
        let tweet = `The Apache Software Foundation considered this licensing arrangement to be incompatible
                 with its licensing policies, as it "passes along risk to downstream consumers of our software imbalanced
                  in favor of the licensor, not the licensee, thereby violating our Apache legal policy of being 
                  a universal donor", and "are not a subset of those found in the [Apache License 2.0], and they cannot 
                  be sublicensed as [Apache License 2.0]."[43]. In August 2017, Facebook dismissed 
                  the Apache Foundation's downstream concerns and refused to reconsider their license[44][45]. 
                  The following month, WordPress decided to switch their Gutenberg and Calypso projects away 
                  from React.On September 23, 2017, Facebook announced that the following week, 
                  it would re-license Flow, Jest, React, and Immutable.js under a standard MIT License; the company stated that React was 
                  "the foundation of a broad ecosystem of open source software for the web", and that 
                  they did not want to "hold back forward progress for nontechnical reasons.`;

        let splittedList = getChunks(tweet, MAX_WORD_LENGTH);
        expect(getRawtext(splittedList)).toBe(tweet);
    });
});
