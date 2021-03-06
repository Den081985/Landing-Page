//модуль для обработки вопросов
//класс с методами обработки вопросов
export class Question {
  //метод create выполняет запрос в базу данных,помещает вопрос в хранилище
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
  //выполняет рендер элементов вопросов
  static render() {
    const elements = getFromStorage();
    const html = elements.length
      ? elements.map(renderModal).join("")
      : `<div class="mui--text-headline">Вопросов нет</div>`;
    const list = document.getElementById("list");
    list.innerHTML = html;
  }
  //метод для работы с idToken

  static fetch(token) {
    if (!token) {
      return Promise.resolve(
        "<p class='comment-error'>ОТСУТСТВУЕТ АВТОРИЗАЦИЯ</p>"
      );
    }
    return fetch(
      `https://authorize-page-default-rtdb.firebaseio.com/authorize-page.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((content) => {
        if (content && content.error) {
          return `<h2 class="content-error">${content.error}</h2>`;
        }
        return content
          ? Object.keys(content).map((key) => ({
              ...content[key],
              id: key,
            }))
          : [];
      });
  }
  //метод для приведения элементов к html
  static returnHTML(questions) {
    return questions.length
      ? `
      <ul>
        ${questions.map((question) => `<li class="question-item">${question.question}</li>`).join("")}
      </ul>
    
    `
      : "<h2>ВОПРОСОВ НЕТ</h2>";
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
export function renderModal(question) {
  return `
    
        <span class="modal-element">Вопрос на  тему: ${question.theme}</span>
        <div class="modal-element">${question.question}</div>
        <div class="modal-date">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
   
  
  `;
}
