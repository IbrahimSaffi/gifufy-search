<<<<<<< HEAD
let apiKey = "k1zKuwTtZ1A22jwZONbnXUn6TkTvjTQ1";
let q = document.querySelector("input");
let btn = document.querySelectorAll(".type-btn");
let search = document.querySelector(".search");
let errDis = document.querySelector(".error")
let rem = document.querySelector(".rem")
function start() {
 trending("gifs")
  btn.forEach((ele) => {
    ele.addEventListener("click", () => {
      let arr = ele.parentElement.children;
      for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("active");
      }
      ele.classList.add("active");
      
      let [searchType,itemType] =document.querySelectorAll(".active")
      fetchCall()
         if(q.value.length===0&&searchType.textContent.includes("Search")){
          if(itemType.textContent.includes("Stickers")){
           itemType = "stickers"
          }
          else{
            itemType = "gifs"
          }
          trending(itemType)
         }
    });
  });
  search.addEventListener("click", fetchCall);
  q.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
     fetchCall()
    }
  });
}
function trending(type){
  document.querySelector("#loading-container").style.display= "flex"
  document
  .querySelector("#loading-container")
  .scrollIntoView({ behavior: "smooth" })
  document
   fetch(`https://api.giphy.com/v1/${type}/trending?api_key=${apiKey}&limit=25`)
   .then((response)=>response.json())
   .then((data)=>data["data"].forEach(ele=>displayImages(ele)))
   setTimeout(()=>{
     document.querySelector("#loading-container").style.display="none"
    document
    .querySelector("#menu")
    .scrollIntoView({ behavior: "smooth" })
  },5000)   
}
 function displayImages(ele) {
  img = document.createElement("img");
    img.src = ele["images"]["downsized"]["url"];
    img.style.height = "200px";
    img.style.width = "192.5px";
    img.classList.add("items");
    document.querySelector(".searched-items").appendChild(img);

}
async function simpleSearch(type) {
  fetch(
    `https://api.giphy.com/v1/${type}/search?q=${q.value}&api_key=${apiKey}&limit=25`
  )
    .then((response) => response.json())
    .then((data) => data["data"].forEach((ele)=>{
       displayImages(ele)
    })).catch(error=>{
      document.querySelector("#loading-container").style.display="none"
       errDis.style.display = "flex"
       document.querySelector(".error-text").textContent=error
       rem.addEventListener("click",()=>{
        errDis.style.display = "none"
     })
    });
}
async function wordToGif(type) {
  let w = 1;
  while (w <= 10) {
    fetch(
      `https://api.giphy.com/v1/${type}/translate?s=${q.value}&api_key=${apiKey}&weirdnes=w${w}`
    )
      .then((response) => response.json())
      .then((data) => {
        displayImages(data["data"]);
      }).catch(error=>{
        document.querySelector("#loading-container").style.display="none"
         errDis.style.display = "flex"
         document.querySelector(".error-text").textContent=error
         rem.addEventListener("click",()=>{
          errDis.style.display = "none"
       })
      });
    w++;
  }
}

async function fetchCall() {
  document.querySelectorAll(".items").forEach((ele) => {
    ele.remove();
  });
  document.querySelector("#loading-container").style.display= "flex"
  document
  .querySelector("#loading-container")
  .scrollIntoView({ behavior: "smooth" })
  document
  .querySelector("#items-section").style.display = "none"
  let activeStatus = document.querySelectorAll(".active");
  let itemType = "stickers";
  if (activeStatus[1].textContent.includes("GIFs")) {
    itemType = "gifs";
  }
  if (activeStatus[0].textContent.includes("Word to Gif")) {
  await wordToGif(itemType)
  } else {
    await simpleSearch(itemType)
  }
    setTimeout(()=>{
      // Source
      //  https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location
      document.querySelector("#loading-container").style.display="none"
      document
      .querySelector("#items-section").style.display ="flex"
      document
      .querySelector("#items-section")
      .scrollIntoView({ behavior: "smooth" })
    },5000)
}

=======
let apiKey = "k1zKuwTtZ1A22jwZONbnXUn6TkTvjTQ1";
let q = document.querySelector("input");
let btn = document.querySelectorAll("button");
let search = document.querySelector(".search");
function start() {
  btn.forEach((ele) => {
    ele.addEventListener("click", () => {
      let arr = ele.parentElement.children;
      for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove("active");
      }
      ele.classList.add("active");
    });
  });
  search.addEventListener("click", fetchCall);
  q.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      fetchCall();
    }
  });
}
function displayImages(pics) {
  console.log(pics);
  pics.forEach((ele) => {
    img = document.createElement("img");
    img.src = ele["images"]["downsized"]["url"];
    img.style.height = "200px";
    img.style.width = "192.5px";
    img.classList.add("items");
    document.querySelector(".searched-items").appendChild(img);
  });
}
function simpleSearch(type) {
  fetch(
    `https://api.giphy.com/v1/${type}/search?q=${q.value}&api_key=${apiKey}&limit=10`
  )
    .then((response) => response.json())
    .then((data) => displayImages(data["data"]))
    .then(() =>
      // Source
      // https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location
      document
        .querySelector("#search-section")
        .scrollIntoView({ behavior: "smooth" })
    );
}
function wordToGif(type) {
  let weirdnesSortedItems = [];
  let w = 1;
  while (w <= 10) {
    fetch(
      `https://api.giphy.com/v1/${type}/translate?s=${q.value}&api_key=${apiKey}&weirdnes=w${w}`
    )
      .then((response) => response.json())
      .then((data) => {
        weirdnesSortedItems.push(data["data"]);
      });
    w++;
  }
  console.log(weirdnesSortedItems)
  displayImages(weirdnesSortedItems);
  // .then(()=>
  // // Source
  // // https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location
  // document.querySelector("#search-section").scrollIntoView({behavior: 'smooth'}))
}
function fetchCall() {
  document.querySelectorAll(".items").forEach((ele) => {
    ele.remove();
  });
  let activeStatus = document.querySelectorAll(".active");
  let itemType = "stickers";
  if (activeStatus[1].textContent.includes("GIFs")) {
    itemType = "gifs";
  }
  if (activeStatus[0].textContent.includes("Word to Gif")) {
    wordToGif(itemType);
  } else {
    simpleSearch(itemType);
  }
}

//Later work
// also imlement trending when website starts
>>>>>>> 7aaca0683d552b67c48bfd4e3a2e77b1dda24c2d
