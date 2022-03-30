import { IOptions, ISession } from "./interfaces/";

const defaultOption = {
    leftDelimiter: '{',
    rightDelimiter: '}'
}

export const interpolate = (text: string, session:ISession = {}, options:IOptions = defaultOption) => {

    let interpolatedSentence: string = ''
    const words: Array<string> = text.split(' ')

    for(let i=0;i<words.length;i++){
        if(words[i].includes(`${options.leftDelimiter}`) && words[i].includes(`${options.rightDelimiter}`))
        {
            console.log('0.word includes left and right delimiter', words[i])
            const leftDelimiterIndex = words[i].indexOf(`${options.leftDelimiter}`)
            
            let rightSideOfLeftDelimiter: string = words[i].substring(leftDelimiterIndex + options.leftDelimiter.length, words[i].length - leftDelimiterIndex)

            if(rightSideOfLeftDelimiter) { // how to find a needle in a haystack : by dividing
                console.log('1.rightSideOfLeftDelimiter', words[i], `#${rightSideOfLeftDelimiter}#`)
                const rightDelimiterIndex = rightSideOfLeftDelimiter.indexOf(`${options.rightDelimiter}`);
                const variableToBeInterpolated: string = rightSideOfLeftDelimiter.substring(0, rightDelimiterIndex)
    
                console.log('2.variableToBeInterpolated', words[i], variableToBeInterpolated)
                if(variableToBeInterpolated !== '' && session[`${variableToBeInterpolated.replace(`${options.leftDelimiter}`, '').replace(`${options.rightDelimiter}`, '')}`]) {
                    console.log("BINGO: interpolating", session[`${variableToBeInterpolated}`], 'with', `${options.leftDelimiter}${variableToBeInterpolated}${options.rightDelimiter}`)
                    words[i] = words[i].replace(`${options.leftDelimiter}${variableToBeInterpolated}${options.rightDelimiter}`, session[`${variableToBeInterpolated}`])
                }
            }
        }
        interpolatedSentence += `${words[i]} `;
    }

    return interpolatedSentence.substring(0, interpolatedSentence.length-1)
};


