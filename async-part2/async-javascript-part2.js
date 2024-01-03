// Promises
/*
A promise is an object returned by an asynchronous function, which represents the current state of the operation. 
We can attach handlers to this promise object, and these handlers will be executed when the operation has succeeded or failed.
*/ 

// Using the fetch() API
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
  console.log("fetchPromise:", fetchPromise);
fetchPromise.then((response) => {
  if (!response.ok){
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
})
.then((data)=> {
   console.log("data:", data);
})
.catch(error => {
  console.error(`Couldn't get products, ${error}`);
});
// Promise terminology
/*
A promise can be in one of three states:

pending: the promise has been created, and the asynchronous function it's associated with has not succeeded or failed yet. This is the state your promise is in when it's returned from a call to fetch(), and the request is still being made.
fulfilled: the asynchronous function has succeeded. When a promise is fulfilled, its then() handler is called.
rejected: the asynchronous function has failed. When a promise is rejected, its catch() handler is called.

Note that what "succeeded" or "failed" means here is up to the API in question. For example, fetch() rejects the returned promise if (among other reasons) a network error prevented the request being sent, but fulfills the promise if the server sent a response, even if the response was an error like 404 Not Found.

Sometimes, we use the term settled to cover both fulfilled and rejected.

A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise.

*/

//Combining multiple promises
// he promise returned by Promise.all() is:

//fulfilled when and if all the promises in the array are fulfilled. In this case, the then() handler is called with an array of all the responses, in the same order that the promises were passed into all().
// rejected when and if any of the promises in the array are rejected. In this case, the catch() handler is called with the error thrown by the promise that rejected.

const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
  Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });
  // If we try the same code with a badly formed URL, like this:
  const fetchPromise4 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise5 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise6 = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
  Promise.all([fetchPromise4, fetchPromise5, fetchPromise6])
    .then((responses) => {
      for (const response of responses) {
        console.log(`${response.url}: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });
// Then we can expect the catch() handler to run, and we should see something like: Failed to fetch: TypeError: Failed to fetch

/* 
Sometimes, you might need any one of a set of promises to be fulfilled, and don't care which one. In that case, you want Promise.any(). This is like Promise.all(), except that it is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all of them are rejected:
*/
const fetchPromise7 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise8 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise9 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );
  
  Promise.any([fetchPromise7, fetchPromise8, fetchPromise9])
    .then((response) => {
      console.log(`${response.url}: ${response.status}`);
    })
    .catch((error) => {
      console.error(`Failed to fetch: ${error}`);
    });
  // Promise.allSettled()
  // Fulfills when all promises settle.
  // Promise.race()
  // Fulfills when any one of the promises settles, 
  // meaning fulfils if any of the promise is fulfilled or rejects if any promise is rejected.

// async and await
// This enables you to write code that uses asynchronous functions but looks like synchronous code.

async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
  fetchProducts();
  // Note though that async functions always return a promise, so you can't do something like:
  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
  const promise = fetchProducts();
  console.log(promise[0].name); // "promise" is a Promise object, so this will not work
  
  // Instead, you'd need to do something like:

  async function fetchProducts() {
    try {
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
const promise2 = fetchProducts();
promise2.then((data) => console.log(data[0].name));


  