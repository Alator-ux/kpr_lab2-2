import {MiniMaple} from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);
let miniMaple = new MiniMaple()
function setup() {
    document.getElementById('difButton').onclick = ComputeDerivative;
}

function ComputeDerivative() {
    document.getElementById("difRes").textContent='Empty';
    const polynom = document.getElementById('poly').value;
    const variable = document.getElementById('variable').value;
    
    console.log(polynom.replaceAll(" ", ""), variable.replaceAll(" ", ""))

    const out = document.getElementById('difRes');
    let parseRes = miniMaple.set_expression(polynom);
    if(!parseRes) {
        alert("Incorrect input")
        return;
    }
    miniMaple.dif(variable)
    document.getElementById("difRes").textContent=miniMaple.get_expression();
}