var swiper = new Swiper(".slider-swp", {
    pagination: {
      el: '.swiper-pagination',
      dynamickBullests: true,
      clickable: true,
    },
    autoplay:{
        delay:2000,
    },
    loop :true,
});


var Swiper = new Swiper(".slide-products", {
    slidesPerView: 5,
    spaceBetween: 20,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
});
  
