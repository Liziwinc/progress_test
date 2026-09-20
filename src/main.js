import "./style.css";
import { Progress } from "./components/Progress.js";

const container = document.querySelector(".progress");

const valueInput = document.querySelector("#value");
const animateInput = document.querySelector("#animate");
const hideInput = document.querySelector("#hide");

const progress = new Progress(container);

progress.setValue(valueInput.value);
progress.setAnimated(animateInput.checked);
progress.setHidden(hideInput.checked);

valueInput.addEventListener("input", () => {
  if (valueInput.value === "") {
    return;
  }

  const value = progress.setValue(valueInput.value);

  valueInput.value = value;
});

animateInput.addEventListener("change", () => {
  progress.setAnimated(animateInput.checked);
});

hideInput.addEventListener("change", () => {
  progress.setHidden(hideInput.checked);
});