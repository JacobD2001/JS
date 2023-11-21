//can be optimized

async function asyncAdd(...numbers) {
    return new Promise(resolve => {
      setTimeout(() => {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        resolve(sum);
      }, 100);
    });
  }
  
  function measureExecutionTime(func, ...args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    const executionTime = end - start;
  
    return { result, executionTime };
  }
  
  async function performAsyncAddition(numbersArray) {
    let asyncOperations = 0;
  
    const resolvedNumbers = await Promise.all(numbersArray);
    const result = await asyncAdd(...resolvedNumbers.map(num => {
      asyncOperations++;
      return num;
    }));
  
    // Update HTML elements with results
    document.getElementById('result').textContent = `Result: ${result}`;
    document.getElementById('executionTime').textContent = `Execution time: ${executionTime} ms`;
    document.getElementById('asyncOperations').textContent = `Number of async operations: ${asyncOperations}`;
  }
  
  // Create an array with 100 promises
  const numbersArray = Array.from({ length: 100 }, (_, index) => Promise.resolve(index + 1));
  
  // Trigger the asynchronous addition and measure execution time
  const { result, executionTime, asyncOperations } = measureExecutionTime(performAsyncAddition, numbersArray);
  