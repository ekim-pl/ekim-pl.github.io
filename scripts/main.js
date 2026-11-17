const introDialog = document.getElementById("intro-dialog");
const introVideo = document.getElementById("intro-video");
const introMessage = document.getElementById("intro-message");
document.querySelector(".avatar-trigger").addEventListener("click", () => {
  introMessage.hidden = true;
  introVideo.src = `assets/videos/intro-${document.documentElement.lang}.mp4`;
  introDialog.showModal();
  introVideo.play().catch(() => {
    if (!introDialog.open) return;
    introMessage.textContent = introMessage.dataset.playHint;
    introMessage.hidden = false;
  });
});
introDialog
  .querySelector(".intro-close")
  .addEventListener("click", () => introDialog.close());
introDialog.addEventListener("click", (event) => {
  if (event.target === introDialog) introDialog.close();
});
introDialog.addEventListener("close", () => {
  introVideo.pause();
  introVideo.removeAttribute("src");
  introVideo.load();
  introMessage.hidden = true;
});
introVideo.addEventListener("error", () => {
  if (!introDialog.open) return;
  introMessage.textContent = introMessage.dataset.error;
  introMessage.hidden = false;
});

const languageButtons = document.querySelectorAll("[data-language]");
const languageStatus = document.getElementById("language-status");
const translationCache = new Map();
let isLanguageLoading = false;

async function setLanguage(language) {
  if (
    !["en", "pl"].includes(language) ||
    isLanguageLoading ||
    document.documentElement.lang === language
  )
    return;
  isLanguageLoading = true;
  languageStatus.hidden = true;
  languageButtons.forEach((button) => {
    button.disabled = true;
  });
  try {
    let copy = translationCache.get(language);
    if (!copy) {
      const response = await fetch(`locales/${language}.json`);
      if (!response.ok) throw new Error("Translation request failed");
      copy = await response.json();
      const keys = [
        "pageTitle",
        "pageDescription",
        "introPlayHint",
        "introError",
        "languageError",
      ];
      document
        .querySelectorAll("[data-i18n], [data-i18n-alt], [data-i18n-aria]")
        .forEach((element) => {
          keys.push(
            element.dataset.i18n ||
              element.dataset.i18nAlt ||
              element.dataset.i18nAria,
          );
        });
      if (keys.some((key) => typeof copy[key] !== "string"))
        throw new Error("Incomplete translation");
      translationCache.set(language, copy);
    }
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = copy[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      element.alt = copy[element.dataset.i18nAlt];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", copy[element.dataset.i18nAria]);
    });
    document.title = copy.pageTitle;
    document.querySelector('meta[name="description"]').content =
      copy.pageDescription;
    introMessage.dataset.playHint = copy.introPlayHint;
    introMessage.dataset.error = copy.introError;
    document.documentElement.lang = language;
    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === language),
      );
    });
  } catch {
    languageStatus.textContent =
      translationCache.get(document.documentElement.lang)?.languageError ||
      "Could not change the language. Please try again.";
    languageStatus.hidden = false;
  } finally {
    languageButtons.forEach((button) => {
      button.disabled = false;
    });
    isLanguageLoading = false;
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const galleryVideoDialog = document.getElementById("gallery-video-dialog");
const galleryVideo = galleryVideoDialog.querySelector("iframe");
document.querySelector(".gallery-video-trigger").addEventListener("click", (event) => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  galleryVideoDialog.showModal();
  galleryVideo.src = "https://www.youtube-nocookie.com/embed/VHEe8KECsPo?autoplay=1&playsinline=1&rel=0";
});
galleryVideoDialog.querySelector(".intro-close").addEventListener("click", () => galleryVideoDialog.close());
galleryVideoDialog.addEventListener("click", (event) => {
  if (event.target === galleryVideoDialog) galleryVideoDialog.close();
});
galleryVideoDialog.addEventListener("close", () => galleryVideo.removeAttribute("src"));
