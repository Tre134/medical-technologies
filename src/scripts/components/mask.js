document.addEventListener("DOMContentLoaded", function () {

    // Функция для форматирования телефонного номера
    function formatPhoneNumber(input) {
        let inputNumbersValue = getInputNumbersValue(input);
        let formattedInputValue = "";

        if (inputNumbersValue[0] === "7" || inputNumbersValue[0] === "8" || inputNumbersValue[0] === "9") {
            if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
            formattedInputValue = firstSymbols + " ";

            if (inputNumbersValue.length > 1) {
                formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 13);
            }
        } else {
            formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
        }

        input.value = formattedInputValue;
    }

// Функция для извлечения числовых значений из ввода
    function getInputNumbersValue(input) {
        return input.value.replace(/\D/g, "");
    }

// Функция для обработки вставки
    function onPhonePaste(e) {
        let pasted = (e.clipboardData || window.clipboardData || {}).getData("Text");
        let input = e.target;
        let inputNumbersValue = getInputNumbersValue(input);

        if (pasted && /\D/g.test(pasted)) {
            input.value = inputNumbersValue;
        }
    }

// Обработчики событий для телефонных полей
    document.querySelectorAll('input[type="tel"]').forEach((input) => {
        input.addEventListener("input", () => formatPhoneNumber(input));
        input.addEventListener("keydown", (e) => {
            if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
                input.value = "";
            }
        });
        input.addEventListener("paste", onPhonePaste);
    });

// Функция для ограничения ввода на текстовых полях
    function restrictInput(e) {
        const key = e.key;
        if (/^[a-zA-Zа-яА-Я]+$/.test(key)) {
            return true;
        }
        e.preventDefault();
        return false;
    }

// Функция для обработки текстового ввода
    function onTextInput(e) {
        let input = e.target;
        let inputValue = input.value;
        if (inputValue !== "") {
            input.value = inputValue[0].toUpperCase() + inputValue.slice(1);
        }
    }

// Обработчики событий для текстовых полей
    document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.addEventListener("keydown", restrictInput);
        input.addEventListener("input", onTextInput);
    });
});
