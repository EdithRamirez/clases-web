"use strict";

/**
 * [[Archivo global del proyecto]]
 * @private
 * @author Edith Ramirez <ediths.ramirez07@gmail.com>
 */
(function () {
  var init = function init() {
    if (document.getElementsByClassName('js-lazy').length) lazyLoadImage();
    if (document.getElementsByClassName('js-imgResp').length) {
      changeImageResponsive();
      window.addEventListener('resize', function () {
        changeImageResponsive();
      });
    }

    if (document.getElementsByClassName('js-scrollOnly').length) linkScroll();
  };

  /**
   *  @description Funcion de carga diferida para las imagenes que contenga la clase js-lazy 
   */
  var lazyLoadImage = function lazyLoadImage() {
    document.addEventListener('DOMContentLoaded', function () {
      var lazyloadImages;
      if ('IntersectionObserver' in window) {
        lazyloadImages = document.querySelectorAll('.js-lazy');
        var imageObserver = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove('js-lazy');
              imageObserver.unobserve(image);
            }
          });
        });
        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        console.log('No soportado');
        notSupportedLazy();
        document.addEventListener('scroll', function () {
          notSupportedLazy();
        });
      }
    });
  };

  /**
   *  @description Funcion de carga diferida si no lo soporta los navegadores
   */
  var notSupportedLazy = function notSupportedLazy() {
    var imgLazy = document.querySelectorAll('.js-lazy'),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    heightWindow = window.innerHeight;
    for (var i = 0; i < imgLazy.length; i++) {
      if (imgLazy[i].getBoundingClientRect().top < heightWindow + scrollTop) {
        imgLazy[i].setAttribute('src', imgLazy[i].getAttribute('data-src'));
        imgLazy[i].classList.remove('js-lazy');
      }
    }
  };

  /**
   *  @description Funcion que cambia las imagenes responsivas en pantallas menores de 768
   */
  var changeImageResponsive = function changeImageResponsive() {
    var image = document.querySelectorAll('.js-imgResp'),
      imgDesk,
      imgMob;
    for (var i = 0; i < image.length; i++) {
      imgDesk = image[i].getAttribute('data-desktop');
      imgMob = image[i].getAttribute('data-mobile');
      if (window.innerWidth <= 768) {
        image[i].setAttribute('src', imgMob);
      } else {
        image[i].setAttribute('src', imgDesk);
      }
    }
  };

  
  /**
  *  @description Funcion para menu mobile
  */
  var linkScroll = function linkScroll() {
    var btnScroll = document.querySelectorAll('.js-scrollOnly');

    // Links que solo hacen scroll (no cierran menú)
    btnScroll.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = link.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
 
  init();
})();