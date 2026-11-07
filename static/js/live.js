// LIVE: "now" and "up next" from the schedule (rendered into #live-events) and the visitor's clock.
// Add ?now=2026-11-07T13:30 to the URL to preview what it shows at another time.

(() => {
    const section = document.querySelector("#live");
    if (!section) return;

    const events = [...section.querySelectorAll("#live-events li")]
        .map(li => ({ start: new Date(li.dataset.start), title: li.dataset.title, location: li.dataset.location }))
        .filter(event => !isNaN(event.start))
        .sort((a, b) => a.start - b.start);
    if (events.length === 0) return;

    const preview = new URLSearchParams(window.location.search).get("now");
    const offset = preview && !isNaN(new Date(preview)) ? new Date(preview) - Date.now() : 0;

    const HOUR = 60 * 60 * 1000;
    const showFrom = events[0].start - 3 * HOUR;
    const showUntil = events[events.length - 1].start.getTime() + 2 * HOUR;

    // A "Live" link at the front of the navbar while the section is showing.
    const navItem = document.createElement("li");
    navItem.innerHTML = '<a href="#live"><span class="live-dot"></span>Live</a>';
    navItem.hidden = true;
    document.querySelector(".nav ul")?.prepend(navItem);

    const nowCard = section.querySelector("#live-now");
    const nextCard = section.querySelector("#live-next");

    const clock = date => date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
    const weekday = date => date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "Europe/London" });
    const place = event => (event.location && event.location.toUpperCase() !== "TBD" ? ` · ${event.location}` : "");

    function until(ms) {
        const minutes = Math.ceil(ms / 60000);
        if (minutes <= 1) return "in under a minute";
        const hours = Math.floor(minutes / 60);
        return hours ? `in ${hours}h ${minutes % 60}m` : `in ${minutes}m`;
    }

    function fill(card, title, meta) {
        card.querySelector(".live-title").textContent = title;
        card.querySelector(".live-meta").textContent = meta;
    }

    function update() {
        const now = new Date(Date.now() + offset);
        const showing = now >= showFrom && now < showUntil;
        section.hidden = !showing;
        navItem.hidden = !showing;
        if (!showing) return;

        const nextIndex = events.findIndex(event => event.start > now);
        const next = nextIndex === -1 ? null : events[nextIndex];
        const current = nextIndex === -1 ? events[events.length - 1] : events[nextIndex - 1];

        if (current) {
            fill(nowCard, current.title, `Since ${clock(current.start)}${place(current)}`);
        } else {
            fill(nowCard, "Setting up", "The team's getting everything ready");
        }

        if (next) {
            const day = weekday(next.start) === weekday(now) ? "" : `${weekday(next.start)} `;
            fill(nextCard, next.title, `${day}${clock(next.start)} · ${until(next.start - now)}${place(next)}`);
        } else {
            fill(nextCard, "That's a wrap", "Thanks for coming to WHACK!");
        }
    }

    update();
    setInterval(update, 1000);
})();
