// Any client-side JS the site needs (e.g. the hero countdown ticker).
// Keep it vanilla — no build step, no frameworks.

const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
   if (window.scrollY === 0) {
       nav.classList.remove("scrolled");
   } else {
       nav.classList.add("scrolled");
   }
});

const toggleButton = document.querySelector("#toggle-nav");
toggleButton.addEventListener("click", () => {
   nav.querySelector("ul").classList.toggle("enabled");
   document.body.classList.toggle("lock-scroll");
});

nav.querySelectorAll("a").forEach(link =>  {
    link.addEventListener("click", () => {
        if (nav.querySelector("ul").classList.contains("enabled")) {
            toggleButton.click()
        }
    });
});
