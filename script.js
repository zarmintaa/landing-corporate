'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
})

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const allSection = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
console.log(allSection);
console.log(allButtons);

const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics<button class='btn  btn--close-cookie'>Got it!</button>`;
//
// header.prepend(message);
// header.append(message)
// header.before(message)
header.after(message)
// header.append(message.cloneNode(true));

document.querySelector('.btn--close-cookie')
  .addEventListener('click', () => {
    // message.remove()
    message.parentElement.removeChild(message);
  });


// Scrlloling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({
    behavior: 'smooth'
  })
});

// const h1 = document.querySelector('h1').addEventListener('mouseenter', e => {
//   alert('Great')
// })

// document.querySelector('h1').onmouseenter = e => {
//   alert('Helo')
// }

const alertH1 = e => {
  alert('Helo')
}

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1)

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 2000);



