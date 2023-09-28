// selecting the elements:
let input = document.getElementById("input");
let btn = document.querySelectorAll("button");

// declaring variables:
let currentInput = "";
let currentOperator = "";
let prevInput = "";

// adding event listener to buttons:
btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerHTML;

    // handle numeric input and display:
    if (!isNaN(value) || value === ".") {
      currentInput += value;
      input.value = currentInput;
    }

    // handle operator input:
    if (["+", "-", "*", "/", "%"].includes(value)) {
      if (currentInput !== "") {
        prevInput = currentInput;
        currentInput = "";
        currentOperator = value;
      }
    }

    // handle percentage input:
    if (value === "%") {
      if (currentInput !== "") {
        currentInput = String(parseFloat(currentInput) / 100);
        input.value = currentInput;
      }
    }

    // handle equals button:
    if (value === "=") {
      if (currentInput !== "" && prevInput !== "") {
        switch (currentOperator) {
          case "+":
            currentInput = String(
              parseFloat(prevInput) + parseFloat(currentInput)
            );
            break;
          case "-":
            currentInput = String(
              parseFloat(prevInput) - parseFloat(currentInput)
            );
            break;
          case "*":
            currentInput = String(
              parseFloat(prevInput) * parseFloat(currentInput)
            );
            break;
          case "/":
            currentInput = String(
              parseFloat(prevInput) / parseFloat(currentInput)
            );
            break;
        }

        input.value = currentInput;
        prevInput = "";
        currentOperator = "";
      }
    }

    // handle clear button:
    if (value === "AC") {
      currentInput = "";
      prevInput = "";
      currentOperator = "";
      input.value = "";
    }

    // handle delete button:
    if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      input.value = currentInput;
    }
  });
});

// adding event listener to numpad:

document.addEventListener("keydown", (e) => {
  const key = e.key;
  keyAnimation(key);

  if (!isNaN(key) || key === ".") {
    currentInput += key;
    input.value = currentInput;
  }

  if (["+", "-", "*", "/", "%"].includes(key)) {
    if (currentInput !== "") {
      prevInput = currentInput;
      currentInput = "";
      currentOperator = key;
    }
  }

  if (key === "Backspace" || key === "Delete") {
    currentInput = currentInput.slice(0, -1);
    input.value = currentInput;
  }

  if (key === "=" || key === "Enter") {
    let result = prevInput + " " + currentOperator + " " + currentInput;
    currentInput = eval(result);
    input.value = currentInput;
    prevInput = "";
    currentOperator = "";
  }
});

// for adding animation on keydown:
function keyAnimation(activeButton) {
  // console.log("key Stroke: " + activeButton);

  btn.forEach((button) => {
    if (button.innerHTML == activeButton) {
      button.classList.add("animation");
    }

    setTimeout(function () {
      button.classList.remove("animation");
    }, 200);
  });
}

// toggle color-scheme:
const toggle = document.getElementById("toggleDark");
const body = document.querySelector("body");
toggle.addEventListener("click", function () {
  this.classList.toggle("bi-sun-fill");
  if (this.classList.toggle("fa-moon-fill")) {
    body.style.background = "#282828";
    body.style.transition = "0.5s ease";
  } else {
    body.style.background = "white";
    body.style.transition = "0.5s ease";
  }
});
