# WHACK website

Static site built with [Hugo](https://gohugo.io).

Content that changes year to year lives in `data/` as YAML, so the site can be updated without editing templates.

## Running it

Install Hugo:

- macOS: `brew install hugo`
- Windows: `winget install Hugo.Hugo.Extended`
- Linux: `sudo apt install hugo`

Then:

```bash
hugo server      # local preview at http://localhost:1313, live-reloads
hugo             # build the site into public/
```

## Layout

```
data/                 content as YAML (what future organisers edit)
layouts/index.html    assembles the page from partials
layouts/partials/     one file per section
static/css/main.css   all styling, blocked out per section
static/js/main.js     any client-side JS
static/img/           images
content/_index.md     empty homepage marker
hugo.toml             site config
```

Each section is one partial + its block in `main.css` + (usually) one file in
`data/`. Sections are owned individually; `navbar`, `footer`, `head`,
`layouts/index.html`, the CSS tokens/base blocks, and `hugo.toml` are shared,
coordinate before changing those.
