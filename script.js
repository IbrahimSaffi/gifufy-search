let apiKey = "k1zKuwTtZ1A22jwZONbnXUn6TkTvjTQ1"
let q = document.querySelector("input")
let btn = document.querySelectorAll("button")
let search = document.querySelector(".search")
btn.forEach(ele => {
  ele.addEventListener("click", () => {
    let arr = ele.parentElement.children
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove("active")
    }
    ele.classList.add("active")
  })
})
search.addEventListener("click", () => {
  let activeStatus = document.querySelectorAll(".active")
  searchType = "stickers"
  if (activeStatus[1].textContent.includes("GIFs")) {
    searchType = "gifs"
  } 
  document.querySelectorAll(".items")
  .forEach(ele=>{
   ele.remove()
  })
  fetch(`https://api.giphy.com/v1/${searchType}/search?q=${q.value}&api_key=${apiKey}&limit=25`,
  )
  .then(response=>response.json())
  .then(data=>data["data"].forEach(ele=>{ 
    img = document.createElement("img")
    img.src = ele["images"]["downsized"]["url"]
    img.style.height="200px"
    img.style.width="192.5px"
    img.classList.add("items")
    document.querySelector(".searched-items").appendChild(img)
  })).then(()=>
  
  // https://stackoverflow.com/questions/3569329/javascript-to-make-the-page-jump-to-a-specific-location
  document.querySelector("#search-section").scrollIntoView({behavior: 'smooth'}))
})
//Later work
// when clicked search icon it should scroll down to item
// also add keypress/keydown enter functionality
// also imlement trending when website starts