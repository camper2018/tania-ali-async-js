// How to implement a promise-based API
// Implementing an alarm() api

const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    // if (delay < 0) {
    //   throw new Error("Alarm delay must not be negative");
    // }
    if (delay < 0) {
      reject("Alarm delay must not be negative");
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}


// using promise.then() and promise.catch()

button.addEventListener("click", () => {
  alarm(name.value, delay.value)
    .then((message) => (output.textContent = message))
    .catch((error) => (output.textContent = `Couldn't set alarm: ${error}`));
});

// Using async and await with the alarm() API


button.addEventListener("click", async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  } catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});

/***** My example for Promise API*********/
const fetchUser = (outcomeString) => {
  return new Promise((resolve, reject)=> {
    if (outcomeString === "error") {
      reject(new Error('Failed to fetch user!'))
    }
     // fetch user
    setTimeout(()=> {
     const user = {id: 1, firstname: "George", lastname:  "Ericson"}
     resolve(user);
    },1000)
  })
}
fetchUser()
  .then((result)=>  console.log(`Welcome ${result.firstname} ${result.lastname}!`)

  )
  .catch(error => console.error(error));

  fetchUser('error')
  .then((result)=>  console.log(`Welcome ${result.firstname} ${result.lastname}!`)

  )
  .catch(error => console.error(error));