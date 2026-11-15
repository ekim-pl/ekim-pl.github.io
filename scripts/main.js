const introDialog = document.getElementById("intro-dialog");
const introVideo = document.getElementById("intro-video");
const introMessage = document.getElementById("intro-message");
document.querySelector(".avatar-trigger").addEventListener("click", () => {
  introMessage.hidden = true;
  introVideo.src = "assets/videos/intro.mp4";
  introDialog.showModal();
  introVideo.play().catch(() => {
    if (!introDialog.open) return;
    introMessage.textContent = introMessage.dataset.playHint;
    introMessage.hidden = false;
  });
});
document
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
