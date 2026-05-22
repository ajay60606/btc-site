const slides = document.querySelectorAll(".slide:not(.menu-slide)");

let currentSlide = parseInt(localStorage.getItem("btc-slide")) || 0;
let currentMenu = null;
let isAnimating = false;

function showSlide(index) {

  if (isAnimating) return;

  if (index < 0 || index >= slides.length) return;

  isAnimating = true;

  slides[currentSlide].classList.remove("active");

  currentSlide = index;
  const optionalHotspot = document.querySelector(".optional-hotspot");

if (currentSlide === 20) {
  optionalHotspot.style.display = "block";
}

else {
  optionalHotspot.style.display = "none";
}
  localStorage.setItem("btc-slide", currentSlide);

  slides[currentSlide].classList.add("active");

  setTimeout(() => {
    isAnimating = false;
  }, 900);
}

function openMenu() {

    slides[currentSlide].classList.remove("active");
  
    if (currentSlide <= 4) {
      currentMenu = document.querySelectorAll(".menu-slide")[0];
    }
  
    else {
      currentMenu = document.querySelectorAll(".menu-slide")[1];
    }
  
    currentMenu.classList.add("active");
    document.querySelector(".close-hotspot").style.display = "block";
  }

  function closeMenu() {

    slides[currentSlide].classList.add("active");
  
    currentMenu.classList.remove("active");
  
    document.querySelector(".close-hotspot").style.display = "none";
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

  if (difference > 20) {
    showSlide(currentSlide + 1);
  }

  else if (difference < -20) {
    showSlide(currentSlide - 1);
  }

});

const menuHotspot = document.querySelector(".menu-hotspot");

menuHotspot.addEventListener("click", () => {
  openMenu();
});

const closeHotspot = document.querySelector(".close-hotspot");

closeHotspot.addEventListener("click", () => {
  closeMenu();
});

slides[currentSlide].classList.add("active");