const { Num, Variable } = require("./Powerable");
class Term {
    constructor() {
        this.reInit()
    }
    copy() {
        const copyTerm = new this.constructor();

        copyTerm.vars = this.vars.map(variable => variable.copy());
        copyTerm.nums = this.nums.map(number => number.copy());

        return copyTerm;
    }
    reInit() {
        this.vars = []
        this.nums = []
    }
    parse(input) {
        console.log('term ', input)
        let processing = true
        while (processing) {

            let ind = input.indexOf('*')
            if (ind == -1) {
                ind = input.length
                processing = false
            }
            console.log('ind', ind)
            let unknownVal = input.substring(0, ind)
            let num = new Num()
            let parseRes = num.parse(unknownVal)
            console.log('num parse res', parseRes)
            if (parseRes) {
                if (num.num == 0) {
                    this.reInit();
                    return true;
                }
                if(num.num != 1){
                    this.nums.push(num.copy())
                }
            } else {
                if (input[0] == '-') {
                    num.num = -1;
                    num.pow = 1;
                    this.nums.push(num.copy())
                    unknownVal = input.substring(1, ind)
                } else if (input[0] == '+') {
                    unknownVal = input.substring(1, ind)
                }
                let variable = new Variable()
                if (!variable.parse(unknownVal)) {
                    console.log('var parse res', false)
                    this.reInit()
                    return false
                }
                console.log('var parse res', true)
                this.vars.push(variable.copy())
            }
            input = input.substring(ind + 1, input.length)
        }
        console.log('TERM RETURNED')
        return true
    }
    dif(difVar) {
        if (this.vars.length == 0) {
            return false
        }
        for (let i = 0; i < this.vars.length; i++) {
            if (this.vars[i].dif(difVar)) {
                if (this.nums.length == 0) {
                    this.nums.push(Num.constructorNumPow(1, 1))
                }
                this.nums[0].num *= this.vars[i].pow + 1
                if (this.vars[i].pow == 0) {
                    this.vars.splice(i, 1)
                    console.log(this.toString())
                }
                return true
            }
        }
        return false
    }
    empty(){
        return this.vars.length == 0 && this.nums.length == 0
    }
    toString() {
        let res = ''
        for (let i = 0; i < this.nums.length; i++) {
            res += this.nums[i].toString() + '*'
        }
        if (this.vars.length == 0) {
            return res.substring(0, res.length - 1)
        }
        for (let i = 0; i < this.vars.length - 1; i++) {
            res += this.vars[i].toString() + '*'
        }
        res += this.vars[this.vars.length - 1].toString()
        return res
    }
}

module.exports = { Term };