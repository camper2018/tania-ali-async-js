const calculateFactorial = (n)=> {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1)
}

addEventListener("message", (message) => {
    const {command, number} = message.data;
    if (command === "calculate") {
      const result = calculateFactorial(number);
      postMessage({type: 'factorialResult', result })
    }
  });

/*
***** Use case scenarios for Web Workers**************

Web Workers are beneficial in scenarios where you want to utilize the capabilities of multi-core processors and enhance the overall performance of your web application by offloading tasks to separate threads.

1. Intensive Calculations:
   Performing complex mathematical calculations, simulations, or data processing in the background without blocking the main thread.

2. Parallelize HTTP Requests:
   Making multiple HTTP requests simultaneously in separate workers to improve performance.

3. Image/Video Processing:
   Processing images or videos in the background without affecting the user interface responsiveness.

4. Real-Time Applications:
   Running real-time computations, such as updating a physics simulation, without causing delays in UI responsiveness.

*/