/**
 * 
 * @param {*} partIndicator 
 * 
 * next() will increase the counter
 * getIndicator() will return the indicator text
 */
export function getPartIndicator(partIndicator) {
    let partIndicatorCounter = 0;
    return {
        next: function () {
            partIndicatorCounter++;
            return this;
        },
        getIndicator: () => !partIndicator ? '' : `${partIndicatorCounter}/${partIndicator} `
    };
}

/**
 * 
 * @param {*} inputText 
 * @param {*} maxWordLength 
 * 
 * return list of chunks
 * 
 */
export function getChunks(inputText, maxWordLength) {

    if (!inputText || inputText === '')
        return [''];

    if (inputText.length <= maxWordLength)
        return [inputText];

    let partIndicator = arguments[2] || 0,
        indicator = getPartIndicator(partIndicator),
        tweetList = inputText.split(' '),
        chunks = [],
        noOfChunks = 0,
        count = indicator.getIndicator().length,
        preIndex = 0,
        getChunk = (startIndex, endIndex) => {
            endIndex = endIndex === tweetList.length - 1 ? endIndex + 1 : endIndex;
            return `${indicator.getIndicator()}${tweetList.slice(startIndex, endIndex).join(' ')}`;
        };

    tweetList.forEach((tweet, index) => {
        let spaceLength = (index > 0 && index < (tweetList.length - 1)) ? 1 : 0;
        count = count + tweet.length + spaceLength;
        if (count === maxWordLength) {
            noOfChunks++;
            count = indicator.next().getIndicator().length + -1;// adjusting previously added space
            chunks.push(getChunk(preIndex, index));
            preIndex = index;
        } else if (count > maxWordLength) {
            noOfChunks++;
            count = indicator.next().getIndicator().length + tweet.length;
            chunks.push(getChunk(preIndex, index));
            preIndex = index;
        } else if (index === tweetList.length - 1) {
            noOfChunks++;
            indicator.next();
            chunks.push(getChunk(preIndex, index));
        }
    });


    if (partIndicator !== noOfChunks) {
        chunks = getChunks(inputText, maxWordLength, noOfChunks);
    }

    return chunks;
}