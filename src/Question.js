//модуль для обработки вопросов
//класс с методами обработки вопросов
export class Question {
  static create(question) {
    return fetch(
      "https://authorize-page-default-rtdb.firebaseio.com/authorize-page.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then((question) => putToStorage(question))
      .then(Question.render);
  }
  static render() {
    const elements = getFromStorage();
    const html = elements.length
      ? elements.map(renderModal).join("")
      : `<div class="mui--text-headline">Вопросов нет</div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
}
//извлечение элементов из хранилища
export function getFromStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
//добавление элемента в хранилище
export function putToStorage(question) {
  const questions = getFromStorage();
  questions.push(question);
  return localStorage.setItem("questions", JSON.stringify(questions));
}

//функция генерации модального окна с отображением вопросов
function renderModal(question) {
  return `
    <div class="modal-element">
        <span class="modal-theme">Вопрос на  тему: ${question.theme}</span>
        <div class="modal-text">${question.question}</div>
        <div class="modal-time">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
    </div>
  
  `;
}
