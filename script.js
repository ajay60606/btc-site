const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
let isAnimating = false;

function showSlide(index) {

  if (isAnimating) return;

  if (index < 0 || index >= slides.length) return;

  isAnimating = true;

  slides[currentSlide].classList.remove("active");

  currentSlide = index;

  slides[currentSlide].classList.add("active");

  setTimeout(() => {
    isAnimating = false;
  }, 1800);
}

window.addEventListener("wheel", (event) => {

    if (isAnimating) return;
  
    if (event.deltaY > 5) {
      showSlide(currentSlide + 1);
    }
  
    else if (event.deltaY < -5) {
      showSlide(currentSlide - 1);
    }
  
  });

  let touchStartY = 0;
let touchEndY = 0;

window.addEventListener("touchstart", (event) => {



  touchStartY = event.changedTouches[0].screenY;

});

window.addEventListener("touchend", (event) => {

  if (isAnimating) return;

  touchEndY = event.changedTouches[0].screenY;

  let difference = touchStartY - touchEndY;

  if (difference > 50) {
    showSlide(currentSlide + 1);
  }

  else if (difference < -50) {
    showSlide(currentSlide - 1);
  }

});