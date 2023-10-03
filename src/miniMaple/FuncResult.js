class ParseFloatResult {
    constructor(suc, value) {
        this.suc = suc
        this.value = value
    }
}
class IndexOfResult {
    constructor(ind = -1, char = ''){
        this.ind = ind
        this.char = char
    }
}
module.exports = {ParseFloatResult, IndexOfResult}