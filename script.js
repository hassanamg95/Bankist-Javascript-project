'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click', function(e) {

  const clicked = e.target.closest('.operations__tab')
  if(!clicked) return

  console.log(clicked)
  if(clicked)

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))
  
  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  
})

// Menu fade animation
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    
    console.log(this)
      const link = e.target
      const siblings = link.closest('.nav').querySelectorAll('.nav__link')
      const logo = link.closest('.nav').querySelector('.nav__logo')
      siblings.forEach(el => {

        if(el !== link) {
  
            el.style.opacity = this
        }
        logo.style.opacity = this
      })
    }
}


nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation 
// const initCoords  = section1.getBoundingClientRect()
// console.log(initCoords)
// console.log(window.screenY)
// window.addEventListener('scroll', function(e) {

//    if(window.scrollY > initCoords.top) nav.classList.add('sticky')
//    else nav.classList.remove('sticky')



// })

// const obsCallback = function (entries, observer) {

//     entries.forEach(entry => {
//       console.log(entry)
//     })
// }
// const obsOptions = {

//   root: null,
//   threshold: [0, 1, 0.2],
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
console.log(navHeight)
const stickyNav = function(entries) {
    
  const [entry] = entries
   console.log(entry)
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

   
}

const headerObserver = new IntersectionObserver(stickyNav, {

  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 30}px`
})
headerObserver.observe(header)

// Reveal section
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer) {

  const [entry] = entries
  console.log(entry)
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {

  root: null,
  threshold: 0.15

})

allSections.forEach(function(section) {

  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy images
const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg= function(entries, observer) {

  const [entry] = entries
  console.log(entry)

  if(!entry.isIntersecting) return; 

 entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function() {
     entry.target.classList.remove('lazy-img')
  })
observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {

  root: null,
  threshold: 0,
  rootMargin: '200px'

})
imgTargets.forEach(img => {

  imgObserver.observe(img)

})

// Slider component
const slider = function() {

  const slides = document.querySelectorAll('.slide')
  const slider = document.querySelector('.slider')
  const btnRight = document.querySelector('.slider__btn--right')
  const btnLeft = document.querySelector('.slider__btn--left')
  const dotsContainer = document.querySelector('.dots')
  // slider.style.transform = 'scale(0.2)'
  // slider.style.overflow = 'visible'


  const maxSlides = slides.length - 1
  let curSlide = 0

  const createDots = function() {
    
    slides.forEach(function(_, i) {

    dotsContainer.insertAdjacentHTML('beforeend',`<button class='dots__dot' data-slide='${i}'></button>`)
  })
  }

  createDots()

  const activateDots = function(slide) {

    document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active')
  }
  activateDots(0)

  const goToSlide = function(slide) {

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`
    })

  }

  goToSlide(0)

  const prevSlide = function() {

    if(curSlide == 0) curSlide = maxSlides
    curSlide--  

  goToSlide(curSlide)
  activateDots(curSlide)

  }

  const nextSlide = function() {

    if(curSlide === maxSlides) curSlide = 0
    else curSlide++

  goToSlide(curSlide)
  activateDots(curSlide)

  }

  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function(e) {

    console.log(e)
    if(e.key === 'ArrowRight') nextSlide()
    e.key === 'ArrowLeft' && prevSlide()
  
  })
  dotsContainer.addEventListener('click', function(e) {

    if(e.target.classList.contains('dots__dot')) {

      const {slide} = e.target.dataset
      goToSlide(slide)
    activateDots(slide)
    }
  })
}

slider()