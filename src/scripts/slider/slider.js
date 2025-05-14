export function initMobileSlider() {
  if (window.innerWidth <= 768) {
    const slider = document.querySelector(".slider");
    const dotsContainer = document.querySelector(".slider__dots");
    const cards = document.querySelectorAll(".vertical");

    dotsContainer.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = `slider__dots-dot ${
        i === 0 ? "slider__dots-dot--active" : ""
      }`;
      dot.addEventListener("click", () => {
        scrollToCard(i);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".slider__dots-dot");
    let currentIndex = 0;

    const scrollToCard = (index) => {
      currentIndex = index;
      slider.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth",
      });
      updateDots();
    };

    const updateDots = () => {
      dots.forEach((dot, i) => {
        dot.classList.toggle("slider__dots-dot--active", i === currentIndex);
      });
    };

    slider.addEventListener("scroll", () => {
      const scrollPosition = slider.scrollLeft + slider.offsetWidth / 2;
      const cardPositions = Array.from(cards).map(
        (card) => card.offsetLeft + card.offsetWidth / 2
      );

      let newIndex = 0;
      let minDistance = Infinity;

      cardPositions.forEach((pos, i) => {
        const distance = Math.abs(pos - scrollPosition);
        if (distance < minDistance) {
          minDistance = distance;
          newIndex = i;
        }
      });

      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots();
      }
    });
  }
}
