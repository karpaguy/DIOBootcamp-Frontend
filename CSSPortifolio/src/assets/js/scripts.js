const toggleTheme = document.querySelector("#toggleTheme");
const rootHtml = document.documentElement
const accordionHeaders = document.querySelectorAll(".accordion__header");
const menuLinks = document.querySelectorAll(".menu__link");

function changeTheme(){
  const currentTheme = rootHtml.getAttribute("data-theme");
  console.log("hi")

  if (currentTheme === "light") {
    rootHtml.setAttribute("data-theme", "dark")
    toggleTheme.classList.toggle("bi-sun")
    toggleTheme.classList.toggle("bi-moon-stars")
  }
  else if (currentTheme === "dark") {
    rootHtml.setAttribute("data-theme", "watermelon")
    toggleTheme.classList.toggle("bi-moon-stars")
    toggleTheme.classList.toggle("bi-box2-heart-fill")  
  }
  else if (currentTheme === "watermelon" ) {
    rootHtml.setAttribute("data-theme", "light")
    toggleTheme.classList.toggle("bi-box2-heart-fill")
    toggleTheme.classList.toggle("bi-sun")  
  }
  // currentTheme === "dark" ? rootHtml.setAttribute("data-theme", "light") : rootHtml.setAttribute("data-theme", "dark")

  // toggleTheme.classList.toggle("bi-sun")
  // toggleTheme.classList.toggle("bi-moon-stars")
}

toggleTheme.addEventListener("click", changeTheme);

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionActive = accordionItem.classList.contains("active");

    accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
  })
})

menuLinks.forEach(item => {
  item.addEventListener("click", () => {
    menuLinks.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})