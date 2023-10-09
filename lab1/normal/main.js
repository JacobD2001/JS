//find elements in document
const dodajPoleButton = document.getElementById('dodajPole');
const usunPoleButton = document.getElementById('usunPole');
const inputsContainer = document.getElementById('inputs-container');

//listen to 'click' event on 'dodajPole' element & execute dodajPole function if dodajPoleButton clicked
dodajPoleButton.addEventListener('click', dodajPole);

//listen to 'click' event on 'usunPole' element
usunPoleButton.addEventListener('click', () => {
    const ostatniePole = inputsContainer.lastElementChild; //grab last field
    if (ostatniePole) { //check if there is any field
        usunPole(ostatniePole); //if there is execute usunPole function
    }
});

//function for adding new field
function dodajPole() {
    const input = document.createElement('input'); //creating parent with specifed params
    input.type = 'text';
    input.classList.add('nums');
    input.placeholder = 'Wprowadź liczbę';

    input.addEventListener('input', calculate); //listen to 'input' event on 'input' element and if there is any input execute calculate function

    inputsContainer.appendChild(input); // add child 'input' to parent 'inputsContainer'
}

//function for removing field
function usunPole(input) {
    inputsContainer.removeChild(input);
    calculate();
}

//function to calculate(just like in zieew version)
function calculate() {
    const numsInputs = document.querySelectorAll('.nums');
    const nums = [];

    numsInputs.forEach(input => {
        const num = parseFloat(input.value);

        if (!isNaN(num)) {
            nums.push(num);
        }
    });

    const sumaResult = document.getElementById("suma");
    const sredniaResult = document.getElementById("srednia");
    const minResult = document.getElementById("min");
    const maxResult = document.getElementById("max");


    const suma = nums.reduce((acc, curr) => acc + curr, 0);
    const srednia = suma / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    sumaResult.textContent = `Sum: ${suma}`;
    sredniaResult.textContent = `Average: ${srednia}`;
    minResult.textContent = `Minimum: ${min}`;
    maxResult.textContent = `Maximum: ${max}`;

}

