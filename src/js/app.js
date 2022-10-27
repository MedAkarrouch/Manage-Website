'use strict';
const form = document.querySelector('form');
const input = document.querySelector('input');
const SlideBtns = document.querySelectorAll('.testimonials__slider-btn');
const slides = document.querySelectorAll('.testimonials__slide');
const dots = document.querySelectorAll('.testimonials__dot');
const slideBtnLeft = document.getElementById('btn-left');
const slideBtnRight = document.getElementById('btn-right');
const slideNbr = slides.length;
const wrapperCon = document.querySelector('.wrapper');
const toggleBtnsContainer = document.querySelector('.header__toggle-box');
const mediaQuery = window.matchMedia('(min-width: 900px)');
const links = document.querySelectorAll('a:link');
function init() {
  links.forEach(link =>
    link.addEventListener('click', e => e.preventDefault())
  );
  // Register event listener
  mediaQuery.addListener(handleMediaQuery);
  // initial check
  handleMediaQuery(mediaQuery);
  toggleBtnsContainer.addEventListener('click', e => {
    wrapperCon.classList.toggle('show-menu');
  });
  dots.forEach((dot, index) => (dot.dataset.moveTo = index));
  hadnleSlide(0);
  SlideBtns.forEach(btn => {
    btn.addEventListener('click', hadnleSlideBtnsClicked);
  });
  dots.forEach(dot => dot.addEventListener('click', handleDotClicked));
  form.addEventListener('submit', e => {
    e.preventDefault();
    handleFrom();
  });
}
const hadnleSlideBtnsClicked = function () {
  const moveTo = +this.dataset.moveTo;
  if (moveTo === slideNbr) return;
  if (moveTo === -1) return;
  const nbr = this.id === 'btn-left' ? -1 : 1;
  hadnleSlide(moveTo);
  slideBtnLeft.dataset.moveTo = `${+slideBtnLeft.dataset.moveTo + nbr}`;
  slideBtnRight.dataset.moveTo = `${+slideBtnRight.dataset.moveTo + nbr}`;
};
const renderInputError = function () {
  form.classList.add('footer__form--active');
  input.placeholder = 'exemple123@gmail.com';
  setTimeout(() => {
    form.classList.remove('footer__form--active');
    input.placeholder = 'Updates in your inbox...';
  }, 2000);
};
const handleFrom = function () {
  const email = input.value;
  input.value = '';
  input.blur();
  if (
    isNaN(+email[0]) &&
    email.length > 15 &&
    (email.endsWith('@gmail.com') || email.endsWith('@gmail.fr'))
  )
    return;
  renderInputError();
};
const handleDotClicked = function () {
  const moveTo = +this.dataset.moveTo;
  hadnleSlide(moveTo);
  slideBtnLeft.dataset.moveTo = `${moveTo - 1}`;
  slideBtnRight.dataset.moveTo = `${moveTo + 1}`;
};
const hadnleSlide = function (moveTo) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(moveTo - index) * 100}%)`;
    dots[index].classList.toggle('testimonials__dot--active', index === moveTo);
  });
};
const handleMediaQuery = function (e) {
  if (e.matches) wrapperCon.classList.remove('show-menu');
};
init();
