

// LOGIN TOGGLE //
const loginBtn = document.querySelector('.login');
const formBox = document.querySelector('.form-box');
const titles = document.querySelector('.name');
const closeIcon = document.getElementById('close');

loginBtn.addEventListener('click', () => {
    formBox.classList.add('active-popup');
    titles.classList.add('active');
});


closeIcon.addEventListener('click', () => {
    formBox.classList.remove('active-popup');
    titles.classList.remove('active');
})


// NAV BAR //
window.addEventListener("scroll", function () {
    var navbar = document.getElementById("navbar");
    var viewportWidth = window.innerWidth;

  if (viewportWidth <= 465) { 
    navbar.classList.add("scrolled");
  } else {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  });



// LOGIN OR REGISTER
const loginForm = document.querySelector('.login-form');
const loginLink = document.querySelector('.login-link');
const registerForm = document.querySelector('.register-form');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    loginForm.classList.add('active');
    registerForm.classList.add('active');
});

loginLink.addEventListener('click', () => {
    registerForm.classList.remove('active');
    loginForm.classList.remove('active');
});



// HAMBURGER ICON
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const loginingIn = document.querySelector('.login');
const demo = document.querySelector('.demo');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    loginingIn.classList.toggle('active');
    demo.classList.toggle('active');
});















