const jsonFilePath = "./users.json";

function handleFormSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  validateUser(username, password);
}

async function validateUser(username, password) {
  try {
    const response = await fetch(jsonFilePath);

    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON.");
    }

    const data = await response.json();
    const user = data.users.find(u => u.user === username && u.password === password);

    if (user) {
      saveSession(user);
      window.location.href = "dashboard/dashboard.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error al validar el usuario:", error);
    alert("Hubo un problema al validar el usuario. Inténtalo de nuevo más tarde.");
  }
}

function saveSession(user) {
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('username', user.name);
  console.log(`Sesión iniciada para: ${user.name}`);
}

function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const username = sessionStorage.getItem('username');

  if (isLoggedIn === 'true') {
    alert(`¡Hola de nuevo, ${username}!`);
  }
}

function init() {
  const loginForm = document.getElementById('login-form');
  const cancelButton = document.getElementById('cancel-button');

  loginForm.addEventListener('submit', handleFormSubmit);
  cancelButton?.addEventListener('click', handleCancel);

  checkLoggedIn();
}

document.addEventListener('DOMContentLoaded', init);
