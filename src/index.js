import {MiniMaple} from './miniMaple.js';

document.addEventListener('DOMContentLoaded', setup);

function setup() {
    document.getElementById('submit').onclick = ComputeDerivative;
}

function ComputeDerivative() {
    const polynom = document.getElementById('poly').value;
    const variable = document.getElementById('sym').value;
    
    console.log(polynom.replaceAll(" ", ""), variable.replaceAll(" ", ""))

    const out = document.getElementById('output');
    try{
        const mm = new MiniMaple(polynom.replaceAll(" ", ""), variable.replaceAll(" ", ""))
        out.value = mm.diff();
    }
    catch(error){
        console.log(error.message)
        alert("Invalid input");
        return;
    }
}