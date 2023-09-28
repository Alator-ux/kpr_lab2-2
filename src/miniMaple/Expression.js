import {indexOf} from "./utils"
import {Term} from "./Term"
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
            if(ioRes.ind === -1){
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
        for(let i = 0; i < this.terms.length - 1; i++){
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
        for(let i = 0; i < this.terms.length - 1; i++){
            res += this.terms[i].toString() + this.sumOps[i]
        }
        res += this.terms[this.terms.length - 1].toString()
        return res
    }
}

export {Expression}