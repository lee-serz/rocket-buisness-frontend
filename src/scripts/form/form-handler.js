export function initForm() {
  const form = document.getElementById("form");
  const overlay = document.getElementById("overlay");

  document.querySelectorAll(".card__button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      form.style.display = "flex";
      overlay.classList.add("show");

      const productCard = e.target.closest(".product__card");
      const productTitle =
        productCard.querySelector(".card__title").textContent;
      form.dataset.product = productTitle;
    });
  });

  const hideForm = () => {
    form.style.display = "none";
    overlay.classList.remove("show");
  };

  document
    .querySelector(".form__button-exit")
    .addEventListener("click", hideForm);
  overlay.addEventListener("click", hideForm);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector("#name").value,
      phone: form.querySelector("#phone").value,
      product: form.dataset.product || undefined,
    };

    if (!form.querySelector("#privacy").checked) {
      alert("Необходимо согласие на обработку персональных данных");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/form/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Форма успешно отправлена!");
        hideForm();
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Произошла ошибка при отправке формы");
    }
  });

  return { hideForm };
}
