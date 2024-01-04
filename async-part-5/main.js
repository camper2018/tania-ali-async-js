const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// animate using callback hell
const animation1 = alice1.animate(aliceTumbling, aliceTiming).finished;
animation1.then(() => {
    const animation2 = alice2.animate(aliceTumbling, aliceTiming).finished;
    animation2.then(() => {
        alice3.animate(aliceTumbling, aliceTiming).finished;
    })
})

// animate using Promise chaining
alice1.animate(aliceTumbling, aliceTiming).finished
    .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
    .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
    .catch(error => console.error(error));

// animate using async-await
async function animate() {
    try {
        await alice1.animate(aliceTumbling, aliceTiming).finished;
        await alice2.animate(aliceTumbling, aliceTiming).finished;
        await alice3.animate(aliceTumbling, aliceTiming).finished;
    } catch (error) {
        console.error(error);
    }
}
animate();