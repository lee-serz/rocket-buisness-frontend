export function initVideoPlayer() {
  const videoBtn = document.querySelector(".video-preview__button");
  if (videoBtn) {
    videoBtn.addEventListener("click", function () {
      const iframe = document.querySelector(".video-iframe__element");
      iframe.src = iframe.getAttribute("data-src");
      document
        .querySelector(".video-container")
        .classList.add("video-container--active");
    });
  }
}
