export function initFormValidation(form, hideForm) {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const privacyCheckbox = document.getElementById("privacy");
  const submitButton = document.querySelector(".form__button");

  // обработка ошибок
  const createErrorElement = (input, message) => {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("p");
      errorElement.className = "error-message";
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
    return errorElement;
  };

  const validate = () => {
    let valid = true;

    // валидация имени
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("form__input--error");
      createErrorElement(nameInput, "Поле не заполнено");
      valid = false;
    } else {
      nameInput.classList.remove("form__input--error");
      const errorElement = nameInput.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
    }

    // валидация номера телефона
    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (phoneDigits.length !== 11 || !/^7\d{10}$/.test(phoneDigits)) {
      phoneInput.classList.add("form__input--error");
      createErrorElement(phoneInput, "Номер телефона должен содержать 11 цифр");
      valid = false;
    } else {
      phoneInput.classList.remove("form__input--error");
      const errorElement = phoneInput.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
    }

    // валидация чекбокса
    if (!privacyCheckbox.checked) {
      privacyCheckbox.closest("label").classList.add("form__input--error");
      createErrorElement(privacyCheckbox, "*");
      valid = false;
    } else {
      privacyCheckbox.closest("label").classList.remove("form__input--error");
      const errorElement = privacyCheckbox.nextElementSibling;
      if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
      }
    }

    submitButton.disabled = !valid;
    submitButton.classList.toggle("form__button--active", valid);
    return valid;
  };

  nameInput.addEventListener("input", validate);
  phoneInput.addEventListener("input", validate);
  privacyCheckbox.addEventListener("change", validate);

  // маска телефона
  phoneInput.addEventListener("input", function (e) {
    if (e.inputType === "deleteContentBackward") return;

    let digits = this.value.replace(/\D/g, "");
    digits = digits.length > 0 ? "7" + digits.slice(1).replace(/\D/g, "") : "";

    this.value =
      digits.length === 0
        ? ""
        : `+7${digits.length > 1 ? ` (${digits.slice(1, 4)}` : ""}${
            digits.length >= 4 ? `) ${digits.slice(4, 7)}` : ""
          }${digits.length >= 7 ? `-${digits.slice(7, 9)}` : ""}${
            digits.length >= 9 ? `-${digits.slice(9, 11)}` : ""
          }`;

    validate();
  });

  // Отправка формы
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Форма отправлена!");
      form.reset();
      hideForm();
    }
  });
}
