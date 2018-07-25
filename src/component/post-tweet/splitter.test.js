import expect from 'expect';
import {
    getMaxPartIndicatorLength,
    spliceChunk,
    getNoOfChunksInfo,
    getSplittedChunks
} from './splitter';

function setUp() {
}

it('test getMaxPartIndicatorLength', () => {
    expect(getMaxPartIndicatorLength(2)).toBe(4); '2/2 '
    expect(getMaxPartIndicatorLength(200)).toBe(8); '200/200 '
});

it('test spliceChunk with 40 maximum length', () => {
    let tweetList = [`I can't believe`, `Tweeter now supports`, `chunking my messages`],
        maxLength = 40;
    expect(spliceChunk(tweetList, maxLength)).toBe(`I can't believe Tweeter now supports`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`chunking my messages`);
    expect(tweetList.length).toBe(0);
    tweetList = [`I can't`, `believe`, `Tweeter`, `now`, `supports`, `chunking`, `my`, `messages`];
    maxLength = 12;
    expect(spliceChunk(tweetList, maxLength)).toBe(`I can't`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`believe`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`Tweeter now`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`supports`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`chunking my`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`messages`);
});

it('test spliceChunk with 12 maximum length', () => {
    let tweetList = [`I can't`, `believe`, `Tweeter`, `now`, `supports`, `chunking`, `my`, `messages`],
        maxLength = 12;
    expect(spliceChunk(tweetList, maxLength)).toBe(`I can't`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`believe`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`Tweeter now`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`supports`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`chunking my`);
    expect(spliceChunk(tweetList, maxLength)).toBe(`messages`);
});

it('test getNoOfChunksInfo', () => {
    const mockUserEnteredValue = `I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.`
    let noOfChunksInfo = getNoOfChunksInfo(mockUserEnteredValue, 50);
    expect(noOfChunksInfo.noOfChunks).toBe(2);
    expect(noOfChunksInfo.maxWordLength).toBe(46);
});

it('test splitting with getSplittedChunks method', () => {
    let tweet = `I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.`,
        splittedList = getSplittedChunks(tweet, 50);
    expect(splittedList[0]).toBe(`1/2 I can't believe Tweeter now supports chunking`);
    expect(splittedList[1]).toBe(`2/2 my messages, so I don't have to do it myself.`)
    expect(splittedList.map(chunk => {
        let chunkList = chunk.split(' ');
        chunkList.shift();
        return chunkList.join(' ');
    }).join(' ')).toBe(tweet);
});

it('test getSplittedChunks with bigger data', () => {
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

    let splittedList = getSplittedChunks(tweet, 80);
    expect(splittedList.map(chunk => {
        let chunkList = chunk.split(' ');
        chunkList.shift();
        return chunkList.join(' ');
    }).join(' ')).toBe(tweet);
});