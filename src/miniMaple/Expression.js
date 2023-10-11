const { indexOf } = require("./utils");
const { Term } = require("./Term");
const { Num } = require("./Powerable");
class Expression {
    constructor() {
        this.reInit()
    }
    #parseHelper(inp_arr, searchFrom) {
        let ioRes = indexOf(inp_arr[0], ['+', '-'], searchFrom)
        if (ioRes.ind === -1) {
            ioRes.ind = inp_arr[0].length
        } else {
            this.sumOps.push(ioRes.char)
        }
        let term = new Term()
        if (!term.parse(inp_arr[0].substring(0, ioRes.ind))) {
            console.log('Term is not parsed')
            this.reInit()
            return false
        }
        if(!term.empty()){
            this.terms.push(term.copy())
        } else{
            this.sumOps.splice(this.sumOps.length-1, 1)
        }
        
        inp_arr[0] = inp_arr[0].substring(ioRes.ind + 1, inp_arr[0].length)
        return true
    }
    parse(input) {
        this.clear()
        input = input.replaceAll(' ', '')
        console.log('input expr', input)
        if(input.length == 0){
            this.reInit()
            return false
        }
        let parseRes = true
        let inp_arr = [input]
        if (input[0] == '-' || input[0] == '+') {
            parseRes = this.#parseHelper(inp_arr, 1);
            if(!parseRes){
                return false
            }
        }
        while (inp_arr[0].length > 0) {
            parseRes = this.#parseHelper(inp_arr, 0)
            if(!parseRes){
                return false
            }
        }
        return true
    }
    dif(difVar) {
        if (this.terms.length == 0) {
            return
        }
        for (let i = 0; i < this.terms.length - 1; i++) {
            if (!this.terms[i].dif(difVar)) {
                this.terms.splice(i, 1)
                this.sumOps.splice(i, 1)
            }
        }
        let i = this.terms.length - 1
        if (!this.terms[i].dif(difVar)) {
            this.terms.splice(i, 1)
        }
        if (this.terms.length == 0) {
            this.reInit()
        }
    }
    reInit() {
        this.clear()
        let t = new Term()
        let n = new Num()
        n.num = 0
        t.nums.push(n)
        this.terms.push(t)
    }
    clear() {
        this.terms = []
        this.sumOps = []
    }
    toString() {
        let res = ''
        if (this.terms.length == 0) {
            return res
        }
        for (let i = 0; i < this.terms.length - 1; i++) {
            res += this.terms[i].toString() + this.sumOps[i]
        }
        res += this.terms[this.terms.length - 1].toString()
        return res
    }
}

module.exports = { Expression }