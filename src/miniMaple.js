import { Expression } from "./miniMaple/Expression"

export class MiniMaple {
    constructor() {
        this.exp = Expression()
    }
    set_expression(input) {
        return this.exp.parse(input)
    }
    get_expression(){
        return this.exp.toString()
    }
    dif(variable){
        this.exp.dif(variable)
    }
}