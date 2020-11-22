window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const input = [...document.querySelectorAll("#form input")];

  form.addEventListener("click", (e) => {
    if (e.target == input[input.length - 1]) {
      e.preventDefault();
    } else {
      input.forEach((item) => {
        if (e.target == item) {
          if (e.target.value == "") {
            e.target.classList.add("form__input--active");

            e.target.previousElementSibling.classList.add("form__desc--active");
          }
          e.target.addEventListener("blur", (ev) => {
            if (ev.target.value == "") {
              ev.target.classList.remove("form__input--active");
              ev.target.previousElementSibling.classList.remove(
                "form__desc--active"
              );
            }
          });
        }
      });
    }
  });
});
