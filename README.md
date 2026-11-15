# ekim personal website

Source for [ekim-pl.github.io](https://ekim-pl.github.io/).

The public website and its source use English. The site is static, with no build step or runtime dependencies.

## Structure

- `index.html` — page content, navigation, and accessible markup.
- `styles/main.css` — responsive layout, theme, and reduced-motion-aware animations.
- `scripts/main.js` — the introduction video dialog and playback lifecycle.
- `assets/images/branding/` — responsive WebP branding images.
- `assets/images/projects/` — original project SVG icons.
- `assets/videos/intro.mp4` — the English introduction video.
- `.nojekyll` — serve the static files without Jekyll processing.

## Editing

Edit the page directly. Keep filenames, section IDs, comments, and visible text in English.
Use relative asset URLs so the page works on GitHub Pages. Preserve image dimensions and responsive sources.

The avatar opens the video dialog. Video data is requested only after activation; closing the dialog stops playback.
Animation follows the visitor's reduced-motion preference.

## Publishing

GitHub Pages publishes the repository root from `main`. Push changes to `main` to deploy.

Polish translations, the Polish introduction, and unused full-resolution images were archived separately before this refactor; they are not part of the public site.
