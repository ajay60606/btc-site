const slides = document.querySelectorAll(".slide:not(.menu-slide)");


const optionalHotspot = document.querySelector(".optional-hotspot");
const layer2Hotspot = document.querySelector(".layer2-hotspot");
optionalHotspot.addEventListener("click", () => {

    openingOptional = true;
    const optionalTarget =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "optional1"
  );

showSlide(optionalTarget);
  
  });

  layer2Hotspot.addEventListener("click", () => {

    const layer2Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer2"
  );

showSlide(layer2Target);
  
  });




let currentSlide = parseInt(localStorage.getItem("btc-slide")) || 0;


let currentMenu = null;
let isAnimating = false;
let openingOptional = false;
let closingOptional = false;


function updateUIState() {

    const currentLayer =
    slides[currentSlide].dataset.layer;
  
  menuHotspot.style.display =
    (currentLayer === "optional1")
      ? "none"
      : "block";
  
        optionalHotspot.style.display =
        (
          slides[currentSlide]
            .querySelector(".optional-hotspot")
        )
          ? "block"
          : "none";
  
  }

function showSlide(index) {

  if (isAnimating) return;

  if (index < 0 || index >= slides.length) return;

  if (
    currentLayer === "optional1" &&
    targetLayer === "layer1"
  ) return;

  if (
    currentLayer === "optional1" &&
    targetLayer === "layer2"
  ) return;
  
  if (
    currentLayer === "layer2" &&
    targetLayer === "optional1"
  ) return;


if (currentSlide === 25 && index === 26) return;

  isAnimating = true;

  const previousSlide = currentSlide;

  const currentLayer =
  slides[currentSlide].dataset.layer;

const targetLayer =
  slides[index].dataset.layer;

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
  
 const currentLayer =
  slides[currentSlide].dataset.layer;

currentMenu = document.querySelector(
  `.menu-slide[data-menu="${currentLayer}"]`
);
  
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

    const currentLayer =
      slides[currentSlide].dataset.layer;
    
    if (event.deltaY > 5) {
    
      const nextSlide = currentSlide + 1;
    
      const nextLayer =
        slides[nextSlide]?.dataset.layer;
    
      if (
        currentLayer === "optional1" &&
        nextLayer !== "optional1"
      ) {
    
        return;
    
      }
    
      showSlide(nextSlide);
    
    }
    
    else if (event.deltaY < -5) {
    
      const previousSlide = currentSlide - 1;
    
      const previousLayer =
        slides[previousSlide]?.dataset.layer;
    
      if (
        currentLayer === "optional1" &&
        previousLayer !== "optional1"
      ) {
    
        return;
    
      }
    
      showSlide(previousSlide);
    
    }
  
  });

const menuHotspot = document.querySelector(".menu-hotspot");
const menuLayer1Hotspot = document.querySelector(".menu-layer1-hotspot");
const menuLayer2Hotspot = document.querySelector(".menu-layer2-hotspot");
const menuSourceHotspot = document.querySelector(".menu-source-hotspot");

const menu2Layer1Hotspot = document.querySelector(".menu2-layer1-hotspot");

const menu2Layer2Hotspot = document.querySelector(".menu2-layer2-hotspot");

const menu2SourceHotspot = document.querySelector(".menu2-source-hotspot");



const menusLayer1Hotspot = document.querySelector(".menus-layer1-hotspot");

const menusLayer2Hotspot = document.querySelector(".menus-layer2-hotspot");

const menusSourceHotspot = document.querySelector(".menus-source-hotspot");

menuHotspot.addEventListener("click", () => {
  openMenu();
});

menuLayer1Hotspot.addEventListener("click", () => {

    closeMenu();
  
    const layer1Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer1"
  );

showSlide(layer1Target);
  
  });

  menuLayer2Hotspot.addEventListener("click", () => {

    closeMenu();
  
    const layer2Target =
    [...slides].findIndex(
      slide =>
        slide.dataset.layer === "layer2"
    );
  
  showSlide(layer2Target);
  
  });

  menuSourceHotspot.addEventListener("click", () => {

    closeMenu();
  
    const sourceTarget =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "source"
  );

showSlide(sourceTarget);
  
  });

  menu2Layer1Hotspot.addEventListener("click", () => {

    closeMenu();
  
    const layer1Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer1"
  );

showSlide(layer1Target);
  
  });
  
  menu2Layer2Hotspot.addEventListener("click", () => {
  
    closeMenu();
  
    const layer2Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer2"
  );

showSlide(layer2Target);
  
  });
  
  menu2SourceHotspot.addEventListener("click", () => {
  
    closeMenu();
  
    const sourceTarget =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "source"
  );

showSlide(sourceTarget);
  
  });


  menusLayer1Hotspot.addEventListener("click", () => {

    closeMenu();
  
    const layer1Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer1"
  );

showSlide(layer1Target);
  
  });
  
  menusLayer2Hotspot.addEventListener("click", () => {
  
    closeMenu();
  
    const layer2Target =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "layer2"
  );

showSlide(layer2Target);
  
  });
  
  menusSourceHotspot.addEventListener("click", () => {
  
    closeMenu();
  
    const sourceTarget =
  [...slides].findIndex(
    slide =>
      slide.dataset.layer === "source"
  );

showSlide(sourceTarget);
  
  });

const closeHotspot = document.querySelector(".close-hotspot");
const optionalCloseHotspots = document.querySelectorAll(".optional-close-hotspot");
optionalCloseHotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {
  
        
        const returnTarget =
  [...slides].findIndex(
    slide =>
      slide.querySelector(".optional-hotspot")
  );

showSlide(returnTarget);
  
    });
  
  });

closeHotspot.addEventListener("click", () => {
  closeMenu();
});

slides[currentSlide].classList.add("active");
updateUIState();