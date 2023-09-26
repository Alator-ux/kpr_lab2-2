class ParseFloatResult {
    constructor(suc, value) {
        this.suc = suc
        this.value = value
    }
}
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
    for(var i = 0; i < input.length; i++){
        for(var j = 0; j < chars.length; j++){
            if(input[i] === chars[j]){
                return {
                    ind: i,
                    char: chars[j]
                }
            }
        }
    }
    return {
        ind: -1,
        char: ''
    }
}

class Powerable {
    constructor() {
        this.reInit()
    }
    constructor(pow) {
        this.pow = pow
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
    constructor(num, pow = 1) {
        this.num = num
        super(pow)
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
    constructor(variable, pow = 1) {
        this.variable = variable
        super(pow)
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
        let lastInd = -1
        processing = true
        while (processing) {
            let ind = cur.search('*')
            if (ind == -1) {
                ind = cur.length
                processing = false
            }
            let unknownVal = input.substring(lastInd + 1, ind)

            let num = new Num()
            let parseRes = num.parse(unknownVal)
            if (parseRes) {
                this.nums.push(num.copy())
            } else {
                let variable = new Variable()
                if (!variable.parse(unknownVal)) {
                    this.reInit()
                    return false
                }
                this.vars.push(variable.copy())
            }
        }
        return true
    }
    dif(difVar){
        if(this.vars.length == 0){
            return false
        }
        for(var i = 0; i < this.vars.length; i++){
            if(this.vars[i].dif(difVar)){
                if(this.vars[i].pow == 0){
                    this.vars.splice(i ,1)
                } else {
                    if(this.nums.length == 0) {
                        this.nums.push(new Num(1))
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
        for(var i = 0; i < this.nums.length; i++){
            res += this.nums[i].toString() + '*'
        }
        if(this.vars.length == 0){
            return res.substring(0, res.length - 1)
        }
        for(var i = 0; i < this.vars.length - 1; i++){
            res += this.vars[i].toString() + '*'
        }
        res += this.vars[this.vars.length-1].toString()
        return res
    }
}
class Expression {
    constructor(){
        this.reInit()
    }
    parse(input){
        this.reInit()
        input = input.replace(' ', '')
        processing = true
        while (processing){
            let ioRes = indexOf(input, ['+', '-'])
            if(ioRes.ind == -1){
                ioRes.ind = input.length
                processing = false
            } else{
                this.sumOps.push(ioRes.char)
            }
            let term = new Term()
            if(!term.parse(input.substring(0, ioRes.ind))){
                this.reInit()
                return false
            }
            this.terms.push(term.copy())
            input = input.substring(ioRes.ind + 1, input.length)
        }
        return true
    }
    dif(difVar) {
        if(this.terms.length == 0){
            return
        }
        for(var i = 0; i < this.terms.length - 1; i++){
            if(!this.terms[i].dif(difVar)){
                this.terms.splice(i, 1)
                this.sumOps.splice(i, 1)
            }
        }
        let i = this.terms.length - 1
        if(!this.terms[i].dif(difVar)){
            this.terms.splice(i, 1)
        }
    }
    reInit(){
        this.terms = []
        this.sumOps = []
    }
    toString(){
        let res = ''
        if(this.terms.length == 0){
            return res
        }
        for(var i = 0; i < this.terms.length - 1; i++){
            res += this.terms[i].toString() + this.sumOps[i]
        }
        res += this.terms[this.terms.length - 1].toString()
        return res
    }
}
class MiniMaple {
    constructor() {
        this.exp = Expression()
    }
    set_expression(input) {
        return this.exp.parse(input)
    }
    get_expression(){
        return this.exp.toString()
    }
    dif(){
        this.exp.dif()
    }
}

export { MiniMaple }