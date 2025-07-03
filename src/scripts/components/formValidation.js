function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;

    if (!value) {
        input.classList.add("error");
        return false;
    }

    if (type === "tel") {
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            input.classList.add("error");
            return false;
        }
    }

    input.classList.remove("error");
    return true;
}

function validateCheckbox(checkbox) {
    const errorMessage = document.getElementById("checkboxError");

    if (!checkbox.checked) {
        checkbox.classList.add("error");
        errorMessage.style.display = "block";
        return false;
    } else {
        checkbox.classList.remove("error");
        errorMessage.style.display = "none";
        return true;
    }
}

const checkbox = document.getElementById("agreeCheckbox");

document.querySelectorAll("input[type='text'], input[type='email'], input[type='password'], input[type='tel']")
    .forEach(input => {
        input.addEventListener("blur", () => validateInput(input));
    });

if (checkbox) {
    checkbox.addEventListener("change", () => validateCheckbox(checkbox));
}

document.querySelector("form").addEventListener("submit", (e) => {
    let allValid = true;

    document.querySelectorAll("input[type='text'], input[type='email'], input[type='password'], input[type='tel']").forEach(input => {
        if (!validateInput(input)) {
            allValid = false;
        }
    });

    if (checkbox && !validateCheckbox(checkbox)) {
        allValid = false;
    }

    if (!allValid) {
        e.preventDefault();
        alert("Пожалуйста, заполните все обязательные поля корректно.");
    }
});