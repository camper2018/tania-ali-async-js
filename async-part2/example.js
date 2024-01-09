// example

fetch('https://api.imgflip.com/get_memes')
.then((response)=> {
  if (!response.ok) {
    throw new Error("Error fetching request")
  }
  return response.json();
})
.then((data) => {
  const memesContainer = document.getElementById('memes-container');
  const imagesEl = data.data.memes.map(meme => {
    const div = document.createElement('div');
    const img = document.createElement("img");
    img.setAttribute('src', meme.url);
    img.style.width = "100%";
    div.appendChild(img);
    return div;
  });
  memesContainer.append(...imagesEl);
 
})
.catch(error => console.error(error));
