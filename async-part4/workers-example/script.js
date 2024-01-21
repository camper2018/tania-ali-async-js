const worker = new Worker('./worker.js');
document.querySelector("#factorial-btn").addEventListener("click", () => {
    const number = document.getElementById('number').value;
    worker.postMessage({
        command: "calculate",
        number: parseInt(number, 10)
    });
});

worker.addEventListener("message", (message) => {
    const number = document.getElementById('number').value;
    document.querySelector("#result").textContent =
        `Factorial of ${number} is: ${message.data.result}`;
    worker.terminate();
});

document.querySelector("#reload").addEventListener("click", () => {
document.location.reload();
});