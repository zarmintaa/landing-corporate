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


// Scrlloling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({
    behavior: 'smooth'
  })
});

// page navigation

// 1 add event listener to common parent element
// 2 determine what element originated the event

document.querySelector('.nav__links')
  .addEventListener('click', function(e) {
    e.preventDefault();
    // Matching strategy
    if (e.target.classList.contains('nav__link')) {

      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      })
    }
  })


// TAB COMPONENT

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => {
//   console.log('TAB');
// }))

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))

  tabContent.forEach(c => c.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active');

  // activate content

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
})

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////

// const allSection = document.querySelectorAll('.section');
// const allButtons = document.getElementsByTagName('button');
// console.log(allSection);
// console.log(allButtons);
//
// const header = document.querySelector('.header');
//
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `We use cookies for improved functionality and analytics<button class='btn  btn--close-cookie'>Got it!</button>`;
//
// header.prepend(message);
// header.append(message)
// header.before(message)
// header.after(message)
// header.append(message.cloneNode(true));
//
// document.querySelector('.btn--close-cookie')
//   .addEventListener('click', () => {
//     // message.remove()
//     message.parentElement.removeChild(message);
//   });




// const h1 = document.querySelector('h1').addEventListener('mouseenter', e => {
//   alert('Great')
// })

// document.querySelector('h1').onmouseenter = e => {
//   alert('Helo')
// }

/*const alertH1 = e => {
  alert('Helo')
}

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1)

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 2000);
*/
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
//
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());
//
// document
//   .querySelector('.nav__link')
//   .addEventListener('click', function(e) {
//     this.style.backgroundColor = randomColor();
//     console.log("LINK", e.target, e.currentTarget);
//     e.stopPropagation();
//   })
//
//
// document.querySelector('.nav__links')
// .addEventListener('click', function (e)  {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
//   e.stopPropagation();
// })
//
//
// document.querySelector('.nav')
// .addEventListener('click', function (e)  {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// })


