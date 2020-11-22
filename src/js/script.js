window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const input = [...document.querySelectorAll("#form input")];

  const pattern = {
    name: /^[a-záéíóú\-\s*]{1,30}$/gi,
    email: /^[\w-\.]+@[\w-]+\.{1,1}[\w-]{2,4}$/gi,
    password: /[\w\.\-\$\*ñ\/\&%@]{8,}/gi,
  };

  const inputERR = {
    emptyMessage: [
      "First Name cannot be empty",
      "Last Name cannot be empty",
      "Email cannot be empty",
      "Password cannot be empty",
    ],

    errMessage: [
      "First Name must contain up to 30 alphabetic characters",
      "Last Name must contain up to 30 alphabetic characters",
      "Looks like this is not an email",
      "Password must contain 8 characters ",
    ],
  };

  const validateRegEx = (item, regEx, idx) => {
    let isCorrect = true;
    const correctFill = item.value.match(regEx);
    if (correctFill == null) {
      isCorrect = false;
      item.parentElement.nextElementSibling.textContent =
        inputERR.errMessage[idx];
    } else {
      item.nextElementSibling.classList.remove("form__img-error--active");
      item.parentElement.classList.remove("form__input-container--error");
      item.parentElement.nextElementSibling.classList.remove(
        "form__error--active"
      );
    }

    return isCorrect;
  };

  const checkForm = (input) => {
    let correct = true;
    const regExBool = [];
    input.forEach((item, idx) => {
      item.nextElementSibling.classList.add("form__img-error--active");
      item.parentElement.classList.add("form__input-container--error");
      item.parentElement.nextElementSibling.classList.add(
        "form__error--active"
      );
      if (item.value == "") {
        correct = false;
        item.parentElement.nextElementSibling.textContent =
          inputERR.emptyMessage[idx];
      } else {
        let validate;
        if (idx == 2) {
          validate = validateRegEx(item, pattern.email, idx);
          regExBool.push(validate);
        } else if (idx == 3) {
          validate = validateRegEx(item, pattern.password, idx);
          regExBool.push(validate);
        } else {
          validate = validateRegEx(item, pattern.name, idx);
          regExBool.push(validate);
        }
      }

      if (regExBool.length == input.length) {
        correct =
          regExBool.findIndex((bool) => bool == false) != -1 ? false : true;
      }
    });

    return correct;
  };
  form.addEventListener("focusin", (e) => {
    if (e.target != input[input.length - 1]) {
      input.forEach((item) => {
        if (e.target == item) {
          if (e.target.value == "") {
            e.target.classList.add("form__input--active");

            e.target.previousElementSibling.classList.add("form__desc--active");
          }
          e.target.addEventListener("focus", (e) => {
            if (e.target.value == "") {
              e.target.classList.add("form__input--active");

              e.target.previousElementSibling.classList.add(
                "form__desc--active"
              );
            }
          });
          e.target.addEventListener("blur", (e) => {
            if (e.target.value == "") {
              e.target.classList.remove("form__input--active");
              e.target.previousElementSibling.classList.remove(
                "form__desc--active"
              );
            }
          });
        }
      });
    }
  });

  form.addEventListener("click", (e) => {
    if (e.target == input[input.length - 1]) {
      e.preventDefault();
      const formCorrect = checkForm(input.slice(0, input.length - 1));
      if (formCorrect) form.submit();
    }
  });
});
