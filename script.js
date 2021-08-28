'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// tab

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// nav

const nav = document.querySelector('.nav');

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

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);


// Reveal section

const allSection = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(
  revealSection, {
    root: null,
    threshold: 0.15
  }
);

allSection.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


// Lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer)  {
  const [entry] = entries;

  if (!entry.isIntersecting) return

   //replace src to data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '20px'
})

imgTarget.forEach(img => imgObserver.observe(img))



// SLIDE COMPONENT

const slider = () => {



const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length - 1;


const createDots = function() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML('beforeend',
      `<button class='dots__dot' data-slide='${i}'></button>`)
  });
};

const activateDot = (slide) => {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
}


const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    // -100, 0, 100, 200
  });
}

const nexSlide = () => {
  if (currentSlide === maxSlide) {
    currentSlide = 0
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide)
  activateDot(currentSlide)
}


const prevSlide = () => {
  if (currentSlide === 0){
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide)
  activateDot(currentSlide)
}


const init = () => {
  goToSlide(0)
  createDots();
  activateDot(0)
}

init();
// EVENT HANDLER

// next slide
btnRight.addEventListener('click', nexSlide)

// prev slide
btnLeft.addEventListener('click', prevSlide)

// using arrow keyboard
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nexSlide();
})

dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    console.log(slide);
    goToSlide(slide)
    activateDot(slide)
  }
});
}

slider();

/////////////////////////////////////
/////////////////////////////////////

