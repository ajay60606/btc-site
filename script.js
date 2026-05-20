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