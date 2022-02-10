import "./styles.css";
import {
  activateModal,
  activatePostAuthModal,
  formValid,
  openQuestionsModal,
} from "./Utils";
import { Question } from "./Question";
import {
  authEmailAndPassword,
  enterEmailAndPassword,
  openAuthEnter,
  openAuthModal,
} from "./Auth";

const form = document.getElementById("page-form");
const theme = form.querySelector("#theme-input");
const input = form.querySelector("#question-input");
const submit = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");
const authBtn = document.getElementById("auth-btn");
const enterBtn = document.getElementById("enter-btn");

form.addEventListener("submit", submitHandler);

authBtn.addEventListener("click", renderAuthModal);

enterBtn.addEventListener("click", renderEnterModal);

input.addEventListener("input", () => {
  submit.disabled = !formValid(input.value);
});

modalBtn.addEventListener("click", openQuestionsModal);
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

//функция рендеринга модального окна авторизации
function renderAuthModal() {
  activateModal("АВТОРИЗАЦИЯ", openAuthModal());
  document.getElementById("auth-form").addEventListener("submit", authHandler);
}

//функция рендеринга модального окна входа
function renderEnterModal() {
  activateModal("ВОЙТИ", openAuthEnter());
  document
    .querySelector("#enter-form")
    .addEventListener("submit", enterHandler);
}

// функция для работы с данными авторизации
function authHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  const btn = event.target.querySelector("button");

  btn.disabled = true;

  authEmailAndPassword(email, password)
    .then(activatePostAuthModal)
    .then(() => (btn.disabled = false));
}

// функция для работы с данными входа
function enterHandler(event) {
  event.preventDefault();

  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;
  const btn = event.target.querySelector("button");

  btn.disabled = true;

  enterEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderAfterEnterModal);
}
//функция отображения списка вопросов после входа
function renderAfterEnterModal(content) {
  if (content === "string") {
    activateModal("ОШИБКА", content);
  } else {
    activateModal("ВОПРОСЫ", Question.returnHTML(content));
  }
}
