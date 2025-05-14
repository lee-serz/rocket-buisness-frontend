import { initVideoPlayer } from "./scripts/video-player/video-player.js";
import { initForm } from "./scripts/form/form-handler.js";
import { initFormValidation } from "./scripts/form/form-validation.js";
import { initMobileSlider } from "./scripts/slider/slider.js";

document.addEventListener("DOMContentLoaded", function () {
  initVideoPlayer();

  const form = document.getElementById("form");
  if (form) {
    const { hideForm } = initForm();
    initFormValidation(form, hideForm);
  }

  initMobileSlider();
});
