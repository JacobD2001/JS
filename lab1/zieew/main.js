// Find all text fields with the "nums" class
const numsInputs = document.querySelectorAll('.nums');

// Iterate over the found elements and call calculate when event input
numsInputs.forEach(input => {
    input.addEventListener('input', calculate);
});

// Function for calculations
function calculate() {
    const nums = [];

    // Iterate over the text fields and convert input to nums
    numsInputs.forEach(input => {
        const num = parseFloat(input.value);

        // Check if the value is a valid number; if not, set it to 0 bc 0 is def value for numbers
        if (!isNaN(num)) { //if num is not a number returns true
            nums.push(num);
        }
    });

    // Find result elements
    const sumaResult = document.getElementById("suma");
    const sredniaResult = document.getElementById("srednia");
    const minResult = document.getElementById("min");
    const maxResult = document.getElementById("max");

    // Check if there are at least 4 fiels with input and calculate all
    if (nums.length >= 4) {
        const suma = nums.reduce((acc, curr) => acc + curr, 0); // acc = 0 - > acc+ curr = 0 + 2  -> acc = 2 -> 2 + 3 = 5 -> acc= 5, acc- accumulator, curr- current, callback fun
        const srednia = suma / nums.length; //sum / number of elements in an array
        const min = Math.min(...nums); // ... - array -> list of arguments that can be a parameter for the method
        const max = Math.max(...nums);

        // Display results
        sumaResult.textContent = `Sum: ${suma}`;
        sredniaResult.textContent = `Average: ${srednia}`;
        minResult.textContent = `Minimum: ${min}`;
        maxResult.textContent = `Maximum: ${max}`;
    } else {
        // Display this if <4 fields
        sumaResult.textContent = 'Sum: -';
        sredniaResult.textContent = 'Average: -';
        minResult.textContent = 'Minimum: -';
        maxResult.textContent = 'Maximum: -';
    }
}
