# Nikhil's Word — Gyanvee

A small, self-contained HTML/CSS/JavaScript love-letter website. No server, database, build step, or install is needed.

## Open it

Open `index.html` in a modern browser. Sign in with the starter credentials below.

- Username: `gyanvee`
- Password: `ourlittleworld`

## Personalize it

Open `app.js` and edit the `CONFIG` object near the top:

- Change `username` and `password` to your chosen login values.
- Edit `bookTitle`, `coverSubtitle`, `author`, and `dedication` for the cover and title page.
- Edit `prefaceTitle` and `preface` for the soft introduction.
- Edit the eight supplied chapters in `story-data.js`. The ninth chapter is still a placeholder in `app.js` until you have its text.
- `wordsPerPage` controls how much text appears on each story page. Longer chapters automatically get additional pages.

The login is a front-end-only welcome screen, not secure authentication: credentials are visible in `app.js` and can be bypassed by someone who knows how to inspect or change browser code. It is suitable as a personal surprise page, not for protecting private information.
