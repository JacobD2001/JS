
const addButton = document.getElementById('addButton');

    async function asyncAdd(a, b) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(a + b);
            }, 100);
        });
    }
    
    addButton.addEventListener('click', async () => {
        const number1 = parseInt(document.getElementById('number1').value, 10) || 0;
        const number2 = parseInt(document.getElementById('number2').value, 10) || 0;

        const result = await asyncAdd(number1, number2);

        document.getElementById('result').value = result;
    });

