//Synchronous programming
/*
the browser effectively steps through the program one line at a time, in the order we wrote it. At each point, the browser waits for the line to finish its work before going on to the next line.
*/
function multiply(num1, num2){
  return num1 * num2;
};
const name = "Ariana"
console.log(`Hello ${name}! `);
console.log(multiply(2, 4));

// A long-running synchronous function
//  a very inefficient algorithm like below can take longer times to finish and can make our program completely unresponsive.

const MAX_PRIME = 10000000;
// function that checks if the input is a prime number, returns a boolean
function isPrime(n){
   for (let i = 2; i <= Math.sqrt(n); i++){
    if (n % i === 0) {
      return false;
    }
  }
  return n > 1;
}
// generate a random number in the range of 0- MAX_PRIME
// generatePrimes takes a quota or the number of primes required to generate and then pushes that count or total number of prime numbers form the randomly generated numbers and returns those.

const random = (max) => Math.floor(Math.random() * max);
function generatePrimes(quota){
   const primes = [];
   while(primes.length < quota){
    const candidate = random(MAX_PRIME);
    if (isPrime(candidate)){
      primes.push(candidate);
    }
   }
   return primes;
}
// get access to DOM elements with ids quota and output
const quota = document.querySelector("#quota");
const output = document.querySelector("#output");
// When button with id generate is clicked, take user input quota and call generatePrimes to display prime numbers. 
document.querySelector("#generate").addEventListener("click", ()=> {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;

});
document.querySelector("#reload").addEventListener("click", () => {
  document.location.reload();
});
// while our generatePrimes() function is running, our program is completely unresponsive: we can't type anything, click anything, or do anything else.

// Similarly asynchronous functions or tasks e.g HTTP requests, take long time to finish can also make our program non responsive.

const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("loadend", () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  );
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
  log.textContent = "";
  document.location.reload();
});

// Solution is Callbacks or Event handlers ( a type of callback )

// Callback
// A callback is a function that's passed into another function, with the expectation that the callback will be called at the appropriate time.
// callbacks used to be the main way asynchronous functions were implemented in JavaScript.
// However, callback-based code can get hard to understand when the callback itself has to call functions that accept a callback. 

function doStep1(num, callback) {
    const result = num + 1;
    callback(result);
}
function doStep2(num, callback) {
  const result = num + 2;
  callback(result);
}
  
function doStep3(num, callback) {
  const result = num + 3;
  callback(result);
}

function doCalculation() {
  doStep1(1, (result1)=> { // 2
     doStep2( result1, (result2) => { // 4
        doStep3(result2, (result3)=> { 
          console.log(result3); // 7
        })
     })
  });
}

doCalculation();
/*
Because we have to call callbacks inside callbacks, we get a deeply nested doCalculation() function, which is much harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation looks like a pyramid on its side).
When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.
For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise,
*/
  