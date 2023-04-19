calcular = () =>{
    let caseOne = Number(tab1.value)
    let caseTwo = Number(tab2.value)/100;
    let caseThree = Number(tab3.value)
    let caseFour = Number(tab4.value)
    let resultado = ((((caseOne * (caseTwo)) - caseThree) / caseOne) * caseFour).toFixed(2).replace('.',',');
    x1.innerHTML = `${resultado}`
}  