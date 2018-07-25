/**
 * 
 * @param {*} noOfChunks 
 * 
 * return max possible part indicator length
 */
export function getMaxPartIndicatorLength(noOfChunks) {
    return `${noOfChunks}/${noOfChunks} `.length;
}
/**
 * 
 * @param {*} maxWordLength 
 * @param {*} partIndicatorLength 
 * return chunk information
 */
export function getNoOfChunksInfo(inputText, maxWordLength, partIndicatorLength) {
    if (!inputText || inputText === '')
        return { noOfChunks: 0, maxWordLength: 0 };
    let tweetList = inputText.split(' ');
    let noOfChunks = 0, count = 0;
    tweetList.forEach((tweet, index) => {
        let spaceLength = (index > 0 && index < (tweetList.length - 1)) ? 1 : 0;
        count = count + tweet.length + spaceLength;
        if (count === maxWordLength) {
            noOfChunks++;
            count = 0;
        } else if (count > maxWordLength) {
            noOfChunks++;
            count = tweet.length;
        } else if (index === tweetList.length - 1) {
            noOfChunks++;
        }
    });

    let newPartIndicatorLength = getMaxPartIndicatorLength(noOfChunks);

    if (newPartIndicatorLength !== partIndicatorLength) {
        let info = getNoOfChunksInfo(inputText, maxWordLength - newPartIndicatorLength, newPartIndicatorLength);
        noOfChunks = info.noOfChunks;
        maxWordLength = info.maxWordLength;
    }
    return { noOfChunks, maxWordLength };
}
/**
 * 
 * @param {*} tweetList 
 * @param {*} maxWordLength 
 * 
 * this method will modify the list
 * return string with max specified length
 */
export function spliceChunk(tweetList, maxWordLength) {
    let charLength = 0, spliceCount = 0;
    for (let index = 0; index < tweetList.length; index++) {
        let spaceLength = (index > 0 && index < (tweetList.length - 1)) ? 1 : 0;
        let newCharLength = charLength + (tweetList[index].length + spaceLength);
        if (newCharLength > maxWordLength)
            break;
        spliceCount++;
        charLength = newCharLength;
    }
    return tweetList.splice(0, spliceCount).join(' ');
}
/**
 * 
 * @param {*} inputText 
 * 
 * return list of splitted tweet
 */
export function getSplittedChunks(inputText, maxWordLength) {
    let noOfChunksInfo = getNoOfChunksInfo(inputText, maxWordLength),
        result = [];

    if (noOfChunksInfo.noOfChunks <= 1)
        return [inputText];

    let wordList = inputText.split(' ');
    while (result.length < noOfChunksInfo.noOfChunks) {
        let chunk = `${result.length + 1}/${noOfChunksInfo.noOfChunks} ${spliceChunk(wordList, noOfChunksInfo.maxWordLength)}`
        result.push(chunk);
    }
    return result;
}