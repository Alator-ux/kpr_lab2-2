import { ParseFloatResult, IndexOfResult } from "./FuncResult"
function parseFloat(input) {
    let value = input.parseFloat()
    if (value == NaN) {
        value = null
        return new ParseFloatResult(false, value)
    }
    return new ParseFloatResult(true, value)
}
function isDigit(c) {
    return c >= '0' && c <= '9'
}
function isLetter(c) {
    return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z'
}
function indexOf(input, chars) {
    for(let i = 0; i < input.length; i++){
        for(let j = 0; j < chars.length; j++){
            if(input[i] === chars[j]){
                return new IndexOfResult(i, chars[j])
            }
        }
    }
    return new IndexOfResult()
}

export {parseFloat, isDigit, isLetter, indexOf}