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
    reInit(){
        this.vars = []
        this.nums = []
    }
    parse(input) {
        let processing = true
        while (processing) {
            let ind = input.indexOf('*')
            if (ind == -1) {
                ind = input.length
                processing = false
            }
            let unknownVal = input.substring(0, ind)

            let num = new Num()
            let parseRes = num.parse(unknownVal)
            if (parseRes) {
                if(!processing){
                    print("che")
                }
                this.nums.push(num.copy())
            } else {
                let variable = new Variable()
                if (!variable.parse(unknownVal)) {
                    this.reInit()
                    return false
                }
                this.vars.push(variable.copy())
            }
            input = input.substring(ind + 1, input.length)
        }
        return true
    }
    dif(difVar){
        if(this.vars.length == 0){
            return false
        }
        for(let i = 0; i < this.vars.length; i++){
            if(this.vars[i].dif(difVar)){
                if(this.vars[i].pow == 0){
                    this.vars.splice(i ,1)
                } else {
                    if(this.nums.length == 0) {
                        this.nums.push(Num.constructorNumPow(1, 1))
                    }
                    this.nums[0].num *= this.vars[i].pow + 1
                }
                return true
            }
        }
        return false
    }
    toString() {
        let res = ''
        for(let i = 0; i < this.nums.length; i++){
            res += this.nums[i].toString() + '*'
        }
        if(this.vars.length == 0){
            return res.substring(0, res.length - 1)
        }
        for(let i = 0; i < this.vars.length - 1; i++){
            res += this.vars[i].toString() + '*'
        }
        res += this.vars[this.vars.length-1].toString()
        return res
    }
}

module.exports = { Term };