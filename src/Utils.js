import { getFromStorage } from "./Question";
import { renderModal } from "./Question";

//функция валидации входных данных
export function formValid(value) {
  return value.length >= 5;
}

//функция рендеринга модального окна вопросов
export function openQuestionsModal() {
  const elements = getFromStorage();

  const html = elements.length
    ? elements.map(renderModal).join("")
    : `<div class="mui--text-headline modal-none">ВОПРОСОВ НЕТ</div>`;
  const modalEl = document.createElement("div");
  modalEl.className = "modal";
  modalEl.innerHTML = html;

  // show modal
  mui.overlay("on", modalEl);
}

//функция рендеринга окна авторизации
export function activateModal(title, content) {
  let modal = document.createElement("div");
  modal.classList.add("auth-modal");

  const html = `
    <div class="auth-title">${title}</div>
    <div class="auth-content">${content}</div>
  
  `;

  modal.innerHTML = html;
  mui.overlay("on", modal);
}
//функция рендеринга окна поставторизации
export function activatePostAuthModal(localId) {
  let modal = document.createElement("div");
  modal.classList.add("auth-modal");

  const html = `
    <div class="auth-title">ВЫ ЗАРЕГИСТРИРОВАНЫ</div>
    <div class="auth-data">Ваш ID пользователя: ${localId}</div>
  
  `;

  modal.innerHTML = html;
  mui.overlay("on", modal);
}
