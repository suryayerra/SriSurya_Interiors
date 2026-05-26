# Sri Surya Interior Designers & Architects — Website

A single-page website for Sri Surya Interior Designers & Architects, an interior design and architecture firm based in Nizampet, Hyderabad.

## Project Structure

```
sri-surya-interiors/
├── index.html      # Page content and structure (HTML markup)
├── style.css       # All styling — colors, layout, fonts, animations
├── script.js       # Interactivity — portfolio filter, scroll animations, form, video lightbox
├── images/         # All 27 photos used on the site (photo-01.jpg … photo-27.jpg)
└── README.md       # This file
```

Previously the whole site lived in one large HTML file with images embedded directly as base64 text, which made it very heavy (~2.7 MB) and hard to read. It has now been split into clean, separate files so the code is easy to follow and the images load as normal `.jpg` files.

## What each file does

- **index.html** — The page itself: navigation, hero, about, services, portfolio, videos, testimonials, consultation form, contact, and footer sections.
- **style.css** — Every visual rule. The color theme (navy, gold, cream) is defined at the top using CSS variables under `:root`, so the whole site's palette can be changed from one place.
- **script.js** — The behavior of the page:
  - Portfolio category filtering
  - Scroll-triggered fade-in animations
  - Consultation form submission (sends the enquiry and opens WhatsApp with a prefilled message)
  - Active navigation highlighting while scrolling
  - YouTube video pop-up (lightbox)

## How to view it locally

Open `index.html` in any web browser. That's it — no build step or installation needed.

## How to host it on GitHub Pages

1. Create a new repository on GitHub and upload all of these files (keep the `images` folder intact).
2. In the repository, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and the root (`/`) folder, then **Save**.
4. After a minute, your site will be live at `https://<your-username>.github.io/<repository-name>/`.

## Notes

- Fonts (Cormorant Garamond and Jost) are loaded from Google Fonts.
- One `email-decode.min.js` script tag is included automatically by Cloudflare; it is harmless and can be left as-is.
