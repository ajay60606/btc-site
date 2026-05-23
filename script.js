const slides = document.querySelectorAll(".slide:not(.menu-slide)");


const optionalHotspot = document.querySelector(".optional-hotspot");
const layer2Hotspot = document.querySelector(".layer2-hotspot");
optionalHotspot.addEventListener("click", () => {

    openingOptional = true;
    showSlide(26);
  
  });

  layer2Hotspot.addEventListener("click", () => {

    showSlide(33);
  
  });




let currentSlide = parseInt(localStorage.getItem("btc-slide")) || 0;


let currentMenu = null;
let isAnimating = false;
let openingOptional = false;
let closingOptional = false;


function updateUIState() {

    menuHotspot.style.display =
      (currentSlide >= 26 && currentSlide <= 32)
        ? "none"
        : "block";
  
    optionalHotspot.style.display =
      (currentSlide === 20)
        ? "block"
        : "none";
  
  }

function showSlide(index) {

  if (isAnimating) return;

  if (index < 0 || index >= slides.length) return;

  if (currentSlide === 26 && index === 25) return;

if (currentSlide === 32 && index === 33) return;
if (currentSlide === 33 && index === 32) {

    showSlide(25);
  
    return;
  
  }
if (currentSlide === 25 && index === 26) return;

  isAnimating = true;

  const previousSlide = currentSlide;

  slides[previousSlide].classList.remove("active");

  currentSlide = index;
  updateUIState();

  localStorage.setItem("btc-slide", currentSlide);

  
  if (openingOptional && index === 26) {

    slides[index].classList.add("optional-opening");
  
  }

  

  slides[currentSlide].classList.add("active");

  setTimeout(() => {

    slides[index].classList.remove("optional-opening");
  
    openingOptional = false;
  
  }, 600);


  setTimeout(() => {
    isAnimating = false;
  }, 900);
}

function openMenu() {



    slides[currentSlide].classList.remove("active");
  
    if (currentSlide <= 25) {

        currentMenu = document.querySelectorAll(".menu-slide")[0];
      
      }
      
      else if (currentSlide >= 33 && currentSlide <= 65) {
      
        currentMenu = document.querySelectorAll(".menu-slide")[1];
      
      }
      
      else if (currentSlide === 66) {
      
        currentMenu = document.querySelectorAll(".menu-slide")[2];
      
      }
  
    currentMenu.classList.add("active");
    document.querySelector(".close-hotspot").style.display = "block";
  }

  function closeMenu() {

    slides[currentSlide].classList.add("active");
    updateUIState();
  
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
  
      if (currentSlide >= 26 && currentSlide <= 32) {
  
        if (currentSlide < 32) {
          showSlide(currentSlide + 1);
        }
  
      }
  
      else {
  
        showSlide(currentSlide + 1);
  
      }
  
    }
  
    else if (difference < -20) {
  
      if (currentSlide >= 26 && currentSlide <= 32) {
  
        if (currentSlide > 26) {
          showSlide(currentSlide - 1);
        }
  
      }
  
      else {
  
        showSlide(currentSlide - 1);
  
      }
  
    }
  
  });

const menuHotspot = document.querySelector(".menu-hotspot");
const menuLayer1Hotspot = document.querySelector(".menu-layer1-hotspot");
const menuLayer2Hotspot = document.querySelector(".menu-layer2-hotspot");
const menuSourceHotspot = document.querySelector(".menu-source-hotspot");

menuHotspot.addEventListener("click", () => {
  openMenu();
});

menuLayer1Hotspot.addEventListener("click", () => {

    closeMenu();
  
    showSlide(0);
  
  });

  menuLayer2Hotspot.addEventListener("click", () => {

    closeMenu();
  
    showSlide(33);
  
  });

  menuSourceHotspot.addEventListener("click", () => {

    closeMenu();
  
    showSlide(66);
  
  });

const closeHotspot = document.querySelector(".close-hotspot");
const optionalCloseHotspots = document.querySelectorAll(".optional-close-hotspot");
optionalCloseHotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {
  
        
        showSlide(20);
  
    });
  
  });

closeHotspot.addEventListener("click", () => {
  closeMenu();
});

slides[currentSlide].classList.add("active");
updateUIState();