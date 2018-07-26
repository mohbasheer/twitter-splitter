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
 * @param {*} partIndicator 
 * 
 * return list of chunks
 * 
 */
export function getChunks(inputText, maxWordLength, partIndicator) {
    if (!inputText || inputText === '')
        return [''];

    if (inputText.length <= maxWordLength)
        return [inputText];

    let indicator = getPartIndicator(partIndicator),
        tweetList = inputText.split(' '),
        chunks = [],
        noOfChunks = 0,
        count = indicator.getIndicator().length,
        preIndex = 0;

    tweetList.forEach((tweet, index) => {
        let spaceLength = (index > 0 && index < (tweetList.length - 1)) ? 1 : 0;
        count = count + tweet.length + spaceLength;
        if (count === maxWordLength) {
            noOfChunks++;
            count = indicator.next().getIndicator().length + -1;// adjusting previously added space
            chunks.push(`${indicator.getIndicator()}${tweetList.slice(preIndex, index).join(' ')}`);
            preIndex = index;
        } else if (count > maxWordLength) {
            noOfChunks++;
            count = indicator.next().getIndicator().length + tweet.length;
            chunks.push(`${indicator.getIndicator()}${tweetList.slice(preIndex, index).join(' ')}`);
            preIndex = index;
        } else if (index === tweetList.length - 1) {
            noOfChunks++;
            chunks.push(`${indicator.next().getIndicator()}${tweetList.slice(preIndex).join(' ')}`);
        }
    });


    if (partIndicator !== noOfChunks) {
        chunks = getChunks(inputText, maxWordLength, noOfChunks);
    }

    return chunks;
}