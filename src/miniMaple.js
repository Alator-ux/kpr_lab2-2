const { Expression } = require("./miniMaple/Expression");
class MiniMaple {
    constructor() {
        this.exp = new Expression()
    }
    set_expression(input) {
        return this.exp.parse(input)
    }
    get_expression() {
        return this.exp.toString()
    }
    dif(variable){
        if (variable.length == 0){
            return
        }
        this.exp.dif(variable)
    }
}
module.exports = { MiniMaple };