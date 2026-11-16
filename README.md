# ekim personal website

Source for [ekim-pl.github.io](https://ekim-pl.github.io/).

The website defaults to English and offers Polish through the footer language switch. Source identifiers, filenames, and comments use English. The site is static, with no build step or runtime dependencies.

## Structure

- `index.html` — page content, navigation, and accessible markup.
- `styles/main.css` — responsive layout, theme, and reduced-motion-aware animations.
- `scripts/main.js` — the introduction video dialog and playback lifecycle.
- `assets/images/branding/` — responsive WebP branding images.
- `assets/images/projects/` — original project SVG icons.
- `assets/videos/intro-en.mp4` and `intro-pl.mp4` — localized introduction videos.
- `locales/` — English and Polish copy; translations are fetched only when the visitor switches language.
- `.nojekyll` — serve the static files without Jekyll processing.

## Editing

Edit the page directly. Keep filenames, section IDs, and comments in English. Update both translation files when editing localized text, and keep the initial HTML in English.
Use relative asset URLs so the page works on GitHub Pages. Preserve image dimensions and responsive sources.

The avatar opens the video dialog. Video data is requested only after activation; closing the dialog stops playback.
Animation follows the visitor's reduced-motion preference.

## Publishing

GitHub Pages publishes the repository root from `main`. Push changes to `main` to deploy.

The footer switch loads `locales/en.json` or `locales/pl.json` and updates page content and accessible labels. The avatar plays the matching introduction. Language preference is not stored; each visit starts in English. Unused full-resolution images were archived separately.

Section 05 presents two fully clickable social cards. The YouTube card opens the featured FM-1 Flasher & Awesome FM-1 video in a landscape dialog; the embed loads only after activation and is cleared when closed. Its poster is stored locally. Update the video URL, embed, title and poster together when featuring a newer upload. The Instagram card links to the supplied FM-1 Flasher story; story links may expire, so replace it with a permanent `/stories/highlights/` URL when available. Both cards have English and Polish copy. Section 06 is the closing section.
