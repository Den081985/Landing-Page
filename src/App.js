import "./styles.css";
import { formValid } from "./Utils";
import { Question } from "./Question";

const form = document.getElementById("page-form");
const theme = form.querySelector("#theme-input");
const input = form.querySelector("#question-input");
const submit = form.querySelector("#submit");
// const modalBtn = document.getElementById("modal-btn");

form.addEventListener("submit", submitHandler);

input.addEventListener("input", () => {
  submit.disabled = !formValid(input.value);
});
//функция отправления данных формы
function submitHandler(event) {
  event.preventDefault();
  if (formValid(input.value)) {
    const question = {
      theme: theme.value.trim(),
      question: input.value.trim(),
      date: new Date().toJSON(),
    };

    submit.disabled = true;

    Question.create(question).then(() => {
      input.value = "";
      theme.value = "";
      input.className = "";
      theme.className = "";
      submit.disabled = false;
    });
  }
}
