import expect from 'expect';
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

it('validate getChunks with 0 letters', () => {
    expect(getChunks('', 50).toString()).toBe('');
});

it('validate getChunks with 5 letters', () => {
    expect(getChunks('hello', 50).toString()).toBe('hello');
});

it('validate getChunks with 91 letters', () => {
    let tweet = `I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.`,
        splittedList = getChunks(tweet, 50);
    expect(splittedList[0]).toBe(`1/2 I can't believe Tweeter now supports chunking`);
    expect(splittedList[1]).toBe(`2/2 my messages, so I don't have to do it myself.`);
    expect(getRawtext(splittedList)).toBe(tweet);
});

it('validate getChunks with 1078 letters', () => {
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

    let splittedList = getChunks(tweet, 50);
    expect(getRawtext(splittedList)).toBe(tweet);
});