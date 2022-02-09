//компонент для работы с авторизацией

//ренедеринг окна авторизации

export function openAuthModal() {
  return `
    <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="text" id="name" required>
      <label for="name">ФИО</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email" required>
      <label for="email">EMAIL</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required>
      <label for="password">ПАРОЛЬ</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--raised">Отправить</button>
    </form>
    
    `;
}

//рендеринг окна входа

export function openAuthEnter() {
  return `
    <form class="mui-form" id="enter-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email" required>
      <label for="email">EMAIL</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password"required>
      <label for="password">ПАРОЛЬ</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--raised">Войти</button>
  </form>
    
    `;
}

//функция авторизации с помощью ел.почты и пароля

export function authEmailAndPassword(email, password) {
  const apiKey = "AIzaSyCHO-Ndg0sz8i8xcZnbFTMv8q5KvB-WKPo";

  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.localId);
}
//функция входа с помощью ел.почты и пароля
export function enterEmailAndPassword(email, password) {
  const apiKey = "AIzaSyCHO-Ndg0sz8i8xcZnbFTMv8q5KvB-WKPo";
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
