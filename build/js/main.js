'use strict';

(function () {

  // menu

  var header = document.querySelector('.page-header');
  var navToggle = document.querySelector('.page-header__menu-button');
  var body = document.querySelector('.page__body');

  header.classList.remove('page-header--nojs');

  navToggle.addEventListener('click', function () {
    if (header.classList.contains('page-header--close-menu')) {
      header.classList.remove('page-header--close-menu');
      header.classList.add('page-header--open-menu');
      body.classList.add('page__body--no-scroll');
    } else {
      header.classList.add('page-header--close-menu');
      header.classList.remove('page-header--open-menu');
      body.classList.remove('page__body--no-scroll');
    }
  });

  // popup

  var linkPopup = document.querySelector('.link-popup');
  var popup = document.querySelector('.popup');

  if (popup) {
    var popupIn = popup.querySelector('.popup__wrapper');
    var closeButton = popup.querySelector('.popup__close-btn');

    linkPopup.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup--open');
      body.classList.add('page__body--no-scroll');
    });

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.remove('popup--open');
      body.classList.remove('page__body--no-scroll');
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (popup.classList.contains('popup--open')) {
          evt.preventDefault();
          popup.classList.remove('popup--open');
          body.classList.remove('page__body--no-scroll');
        }
      }
    });

    popup.addEventListener('click', function (evt) {
      if (evt.target !== popupIn) {
        popup.classList.remove('popup--open');
        body.classList.remove('page__body--no-scroll');
      }
    });

    popupIn.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  // popup login

  var loginLinks = document.querySelectorAll('.link-login');
  var popupLogin = document.querySelector('.popup-login');

  if (popupLogin) {
    var popupBox = popupLogin.querySelector('.popup-login__wrapper');
    var closeLogin = popupLogin.querySelector('.popup-login__close-btn');

    var popupForm = popupLogin.querySelector('.popup-login__form');
    var popupEmail = popupLogin.querySelector('#email-popup');
    var popupPassword = popupLogin.querySelector('#password');

    var isStorageSupport = true;
    var storageEmail = '';

    try {
      storageEmail = localStorage.getItem('email');
    } catch (err) {
      isStorageSupport = false;
    }

    var openPopup = function (link, currentPopup) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        currentPopup.classList.add('popup-login--open');
        body.classList.add('page__body--no-scroll');

        popupEmail.focus();

        if (storageEmail) {
          popupEmail.value = storageEmail;
        }
      });
    };

    for (var h = 0; h < loginLinks.length; h++) {
      openPopup(loginLinks[h], popupLogin);
    }

    closeLogin.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupLogin.classList.remove('popup-login--open');

      if (header.classList.contains('page-header--close-menu')) {
        body.classList.remove('page__body--no-scroll');
      }
    });

    popupForm.addEventListener('submit', function (evt) {
      if (!popupEmail.value || !popupPassword.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('email', popupEmail.value);
        }
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (popupLogin.classList.contains('popup-login--open')) {
          evt.preventDefault();
          popupLogin.classList.remove('popup-login--open');

          if (header.classList.contains('page-header--close-menu')) {
            body.classList.remove('page__body--no-scroll');
          }
        }
      }
    });

    popupLogin.addEventListener('click', function (evt) {
      if (evt.target !== popupBox) {
        popupLogin.classList.remove('popup-login--open');

        if (header.classList.contains('page-header--close-menu')) {
          body.classList.remove('page__body--no-scroll');
        }
      }
    });

    popupBox.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  // filter

  var filter = document.querySelector('.filter');
  var filterOpen = document.querySelector('.filter__open-filter-btn');
  var filterClose = document.querySelector('.filter__close-btn');

  if (filter) {
    filterOpen.addEventListener('click', function () {
      if (filter.classList.contains('filter--open')) {
        filter.classList.remove('filter--open');
      } else {
        filter.classList.add('filter--open');
      }
    });

    filterClose.addEventListener('click', function (evt) {
      evt.preventDefault();

      filter.classList.remove('filter--open');
    });
  }

  // accordion

  var accordions = document.querySelectorAll('.accordion');

  var addSwitch = function (block) {
    var switcher = block.querySelector('.accordion__switch');
    var title = block.querySelector('.accordion__title span');

    var closePopup = function (evt) {
      if (block.classList.contains('accordion--open')) {
        evt.stopPropagation();

        block.classList.remove('accordion--open');

        switcher.removeEventListener('click', closePopup);
        title.removeEventListener('click', closePopup);
      }
    };

    block.addEventListener('click', function () {
      block.classList.add('accordion--open');

      switcher.addEventListener('click', closePopup);
      title.addEventListener('click', closePopup);
    });
  };

  if (accordions) {
    for (var j = 0; j < accordions.length; j++) {
      accordions[j].classList.remove('accordion--nojs');

      addSwitch(accordions[j]);
    }
  }

  // tabs

  var tabs = document.querySelectorAll('.product__tab');
  var tabBlocks = document.querySelectorAll('.product__tabs-block');

  if (tabs) {
    var switchesTabs = function (tab, block) {
      tab.addEventListener('click', function (evt) {
        evt.preventDefault();

        for (var k = 0; k < tabs.length; k++) {
          tabs[k].classList.remove('product__tab--active');
          tabBlocks[k].classList.remove('product__tabs-block--show');
        }

        tab.classList.add('product__tab--active');
        block.classList.add('product__tabs-block--show');
      });

    };

    for (var i = 0; i < tabs.length; i++) {
      switchesTabs(tabs[i], tabBlocks[i]);
    }
  }
})();

// Initialize Swiper

(function () {
  var sliderNew = document.querySelector('.new__slider');

  if (sliderNew) {
    var swiperNew = new Swiper('.new__slider', {
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
            },
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
      }
    });
  };
})();

(function () {

  var BREAKPOINT = 768;
  var imgBlock = document.querySelector('.product__img-blocks');

  var windowInnerWidth = document.documentElement.clientWidth;

  if ((windowInnerWidth < BREAKPOINT) && (imgBlock)) {
    var swiperProduct = new Swiper('.product__img-blocks', {
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        },
      },
    });
  }

})();

