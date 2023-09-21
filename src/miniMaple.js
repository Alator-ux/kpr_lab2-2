class Val {
    constructor(variable){
        this.variable = variable
    }
    get(){
        return this.variable
    }
}

class Func extends Val {
    constructor(func, variable) {
        super(variable)
        this.func = func
    }
    get(){
        return this.func + '(' + super.get() + ')'
    }
}
class Num {
    constructor(){
        this.num = null
    }
    parse(input){
        this.num = input.parseFloat()
        if(this.num == NaN){
            this.num = null
            return false
        }
        return true
    }
    get(){
        return this.num.toString()
    }
}
class ValPow {
    constructor(){
        this.val = //VAL
        this.pow = //NUM
    }
    parse(input){
        let powInd = input.search('^')
        cur = input
        if(powInd != -1){
            let valParseRes = this.val.parse(input.substring(0, powInd).trim())
            let powParseRes = this.pow.parse(input.substring(powInd+1, input.lenght).trim())
            if(!powParseRes){
                return false// AAAAA
            }
        }
    }
    get(){
        return this.val.get() + '^' + this.pow
    }
}
class MiniExpr {
    constructor(){ }
    #isDigit(c){
        return c >= '0' && c <= '9'
    }
    #parse(input){
        let lastInd = -1
        processing = true
        while (processing) {
            let ind = cur.search('*')
            if (ind == -1){
                ind = cur.lenght
                processing = false
            }
            let unknownVal = input.substring(lastInd + 1, ind)
            
            let num = new Num()
            let parseRes = num.parse(unknownVal)
            if(parseRes){
                this.muls.push(num)
            } else {
                let val = new ValPow()
                parseRes = val.parse(unknownVal)
                if(parseRes == false) {
                    return false
                }
                this.vals.push(val)
            }
        }
    }
    read(input){
        let other = ''

        let endMEInd  = input.search('+') // end index of MiniExpr
        let minInd   = input.search('-')
        if(endMEInd == -1){
            endMEInd = minInd
        }
        if(endMEInd == -1){
            other = ''
        }
        
        if(minInd < endMEInd && minInd != -1){
            endMEInd = minInd
        }

        cur = input.substring(0, endMEInd).trim()
        other = input.substring(endMEInd + 1, input.lenght).trim()
        
        for(var i = 0, sz = cur.lenght; i < sz; i++){
            
        }
        vals, muls
        this.vals = vals
        this.muls = muls
    }
    get() {
        let res = ''
        for(var i = 0, sz = this.muls.lenght; i < sz; i++){
            res += this.muls[i] + '*'
        }
        for(var i = 0, sz = this.vals.lenght; i < sz - 1; i++){
            res += this.vals[i].get() + '*'
        }
        if (this.vals.lenght != 0){
            res += this.vals[this.vals.lenght - 1]
        }
        return res
    }
}
class ExpressionValidator{
    
    validate(input){
        c = input[0]
        res = true;
        if(c == '*'){
            return false
        }
        let minExp = new MiniExpr()
        minExp.read()
        minExp.validate()

        for(var i = 0, sz = input.lenght; i < sz; i++){

        }
    }
}
class MiniMaple{

    #validate(){

    }

    constructor(){
        this.exp = ''
    }
    set_expression(){

    }
}

export {MiniMaple}