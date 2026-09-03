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

const timer = document.querySelector("#timer");

if (timer) {
    const startsAt = new Date(timer.dataset.startsAt);
    const hackingStartsAt = new Date(timer.dataset.hackingStartsAt);
    const endsAt = new Date(timer.dataset.endsAt);

    const daysElem = document.querySelector("#days");
    const hoursElem = document.querySelector("#hours");
    const minutesElem = document.querySelector("#minutes");
    const secondsElem = document.querySelector("#seconds");
    const aboutTextElem = document.querySelector("#time-to-text-body");

    const milestones = [
        { date: startsAt, sign: 1, text: "TIME UNTIL EVENT" },
        { date: hackingStartsAt, sign: 1, text: "TIME UNTIL HACKING BEGINS" },
        { date: endsAt, sign: 1, text: "TIME UNTIL SUBMISSION" },
        { date: endsAt, sign: -1, text: "TIME SINCE SUBMISSION" }
    ].filter(m => !isNaN(m.date));

    function updateCountdown() {
        const now = new Date();
        const diffs = milestones.map(m => m.sign * (m.date - now));

        const index = diffs.findIndex(diff => diff >= 0);
        const chosen = index === -1 ? diffs.length - 1 : index;
        const diff = Math.max(diffs[chosen], 0);

        aboutTextElem.innerText = milestones[chosen].text;

        const times = [
            Math.floor(diff / (1000 * 60 * 60 * 24)),
            Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            Math.floor((diff % (1000 * 60)) / 1000)
        ].map(t => String(t).padStart(2, "0").split(""));

        [daysElem, hoursElem, minutesElem, secondsElem].forEach((elem, i) => {
            elem.innerHTML = "";
            times[i].forEach(digit => {
                const span = document.createElement("span");
                span.innerText = digit;
                elem.appendChild(span);
            });
        });
    }

    setInterval(updateCountdown, 333);
    updateCountdown();
}

const days = document.querySelector("#days-plan");
const dayButtons = document.querySelectorAll("#days-buttons button");

if (days && dayButtons.length === 2) {
    const [button1, button2] = dayButtons;

    button1.addEventListener("click", () => {
        days.classList.remove("flipped");
        button1.classList.add("active");
        button2.classList.remove("active");
    });

    button2.addEventListener("click", () => {
        days.classList.add("flipped");
        button1.classList.remove("active");
        button2.classList.add("active");
    });
}
