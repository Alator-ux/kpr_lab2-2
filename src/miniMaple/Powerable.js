import {parseFloat, isLetter} from "./utils"

class Powerable {
    constructor() {
        this.reInit()
    }
    static constructorPow(pow) {
        let r = new Powerable()
        r.pow = pow
        return pow
    }
    copy() {
        const copyObj = new this.constructor();
        copyObj.pow = this.pow;
        return copyObj;
    }
    reInit(){
        this.pow = null
    }
    parse(input) {
        let sv = parseFloat(input)
        if(!sv.suc || sv.value < 1){
            return false
        }
        this.pow = sv.value
        return true
    }
    toString(){
        return this.pow.toString()
    }
}

class Num extends Powerable {
    constructor() {
        this.reInit()
    }
    static constructorNumPow(num, pow = 1) {
        this.num = num
        this.pow = pow
    }
    copy() {
        const copyObj = super.copy();
        copyObj.num = this.num;
        return copyObj;
    }
    reInit(){
        this.num = null
        super.reInit()
    }
    parse(input) {
        let powInd = input.search('^')
        if (powInd == -1) {
            powInd = input.length
            this.pow = 1
        } else if (!super.parse(input.substring(powInd + 1, input.length))) {
            return false
        }
        let sv = parseFloat(input.substring(0, powInd))
        this.num = sv.value
        return sv.suc
    }
    toString() {
        return this.num.toString() + '^' + super.toString()
    }
}
class Variable extends Powerable {
    constructor() {
        this.reInit()
    }
    static constructorVarPow(variable, pow = 1) {
        this.variable = variable
        this.pow = pow
    }
    copy() {
        const copyObj = super.copy();
        copyObj.variable = this.variable;
        return copyObj;
    }
    reInit(){
        this.variable = null
        super.reInit()
    }
    parse(input) {
        if (!isLetter(c)) {
            return false
        }
        let powInd = input.search('^')
        if (powInd == -1) {
            powInd = input.length
            this.pow = 1
        } else if (!super.parse(input.substring(powInd + 1, input.length))) {
            return false
        }
        input = input.substring(0, powInd)
        for (let i = 0; i < input.length; i++) {
            if(!isLetter(input[i])){
                this.reInit()
                return false
            }
        }
        this.variable = input
        return true
    }
    dif(difVar){
        if(this.variable == difVar){
            this.pow--
            return true
        }
        return false
    }
    toString() {
        return this.variable + '^' + super.toString()
    }
}