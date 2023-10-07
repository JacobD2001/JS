const liczba1Input = document.querySelector('#liczba1');
const liczba2Input = document.querySelector('#liczba2');
const liczba3Input = document.querySelector('#liczba3');
const liczba4Input = document.querySelector('#liczba4');
const btnPrzelicz = document.querySelector('#przelicz');

const sumaResult = document.getElementById("suma");
const sredniaResult = document.getElementById("srednia");
const minResult = document.getElementById("min");
const maxResult = document.getElementById("max");

btnPrzelicz.addEventListener('click', () => {
    const liczba1 = parseFloat(liczba1Input.value);
    const liczba2 = parseFloat(liczba2Input.value);
    const liczba3 = parseFloat(liczba3Input.value);
    const liczba4 = parseFloat(liczba4Input.value);

    const suma = liczba1 + liczba2 + liczba3 + liczba4;
    const srednia = suma / 4;
    const min = Math.min(liczba1, liczba2, liczba3, liczba4);
    const max = Math.max(liczba1, liczba2, liczba3, liczba4);

    sumaResult.textContent = `Suma: ${suma}`;
    sredniaResult.textContent = `Średnia: ${srednia}`;
    minResult.textContent = `Minimum: ${min}`;
    maxResult.textContent = `Maksimum: ${max}`;
})
