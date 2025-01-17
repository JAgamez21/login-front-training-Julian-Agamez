function checkUserLoggedIn() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const username = sessionStorage.getItem('username');

  if (isLoggedIn !== 'true') {
    alert('No tienes acceso al dashboard. Por favor, inicia sesión.');
    window.location.href = '../index.html';
  } else {
    displayWelcomeMessage(username);
  }
}

function displayWelcomeMessage(username) {
  const welcomeMessage = `¡Bienvenido, ${username}!`;
  console.log(welcomeMessage);
  alert(welcomeMessage);
}

function handleLogout() {
  sessionStorage.clear();
  alert('Has cerrado sesión.');
  window.location.href = '../index.html';
}

function initDashboardEvents() {
  const logoutButton = document.getElementById('log-out');

  checkUserLoggedIn();

  logoutButton?.addEventListener('click', handleLogout);
}

document.addEventListener('DOMContentLoaded', initDashboardEvents);
