const { ParseFloatResult, IndexOfResult } = require("./FuncResult");
function safeParseFloat(input) {
    if (input.length == 0 || input.at(0) == '.' || input.at(input.length - 1)  == '.') {
        return new ParseFloatResult(false, 0)
    }
    let containsDot = false;
    for (let i = 0; i < input.length; i++) {
        if (!isDigit(input.at(i))){
            if(!containsDot && input.at(i) == '.'){
                containsDot = true;
            } else{
                return new ParseFloatResult(false, 0)
            }
        }  
    }
    let value = parseFloat(input)
    // if (Number.isNaN(value)) {
    //     value = null
    //     return new ParseFloatResult(false, value)
    // }
    return new ParseFloatResult(true, value)
}
function isDigit(c) {
    return c >= '0' && c <= '9'
}
function isLetter(c) {
    return c >= 'A' && c <= 'Z' || c >= 'a' && c <= 'z'
}
function indexOf(input, chars, searchFrom) {
    for(let i = searchFrom; i < input.length; i++){
        for(let j = 0; j < chars.length; j++){
            if(input[i] === chars[j]){
                return new IndexOfResult(i, chars[j])
            }
        }
    }
    return new IndexOfResult()
}
module.exports = { safeParseFloat, isDigit, isLetter, indexOf }