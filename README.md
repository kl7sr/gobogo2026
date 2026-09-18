# GOBOGO Algérie

Landing page for custom GOBO LED logo projectors in Algeria.

## Features

- Dynamic volumetric light beam with real-time geometric calculations.
- Interactive logo preview: drop or select an image to preview projection on the gobo disc.
- Staggered CSS reveal sequence on first visit (persisted via session storage on page reload).
- Fast and lightweight: zero external libraries or heavy dependencies.
- Direct WhatsApp ordering integration with custom pre-filled message.

## Tech Stack

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)

## Running Locally

Open `index.html` directly in your browser, or start a local dev server:

```bash
npx serve .
# or
python -m http.server 3000
```

## Structure

```
├── index.html       # Hero section, gallery, and layout
├── style.css        # Theme, typography, beam optics, and animations
├── main.js          # Beam alignment, file upload, and session logic
└── assets/          # Gallery images and media
```

## Author

Created by [kl7sr](https://www.instagram.com/kl7sr).
