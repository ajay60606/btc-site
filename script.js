const slides = document.querySelectorAll(".slide:not(.menu-slide)");


const optionalHotspot = document.querySelector(".optional-hotspot");
optionalHotspot.addEventListener("click", () => {

  openingOptional = true;

  const targetLayer =
    optionalHotspot.dataset.target;

  const optionalTarget =
    [...slides].findIndex(
      slide =>
        slide.dataset.layer === targetLayer
    );

  showSlide(optionalTarget);

});


const layer2Hotspots =
  document.querySelectorAll(".layer2-hotspot");

layer2Hotspots.forEach(hotspot => {

  hotspot.addEventListener("click", () => {

    const targetLayer =
      hotspot.dataset.target;

    const layer2Target =
      [...slides].findIndex(
        slide =>
          slide.dataset.layer === targetLayer
      );

    showSlide(layer2Target);

  });

});

const sourceHotspots =
  document.querySelectorAll(".source-hotspot");

sourceHotspots.forEach(hotspot => {

  hotspot.addEventListener("click", () => {

    const targetLayer =
      hotspot.dataset.target;

    const sourceTarget =
      [...slides].findIndex(
        slide =>
          slide.dataset.layer === targetLayer
      );

    showSlide(sourceTarget);

  });

});




let currentSlide = parseInt(localStorage.getItem("btc-slide")) || 0;


let currentMenu = null;
let isAnimating = false;
let openingOptional = false;
let closingOptional = false;


function updateUIState() {

    const currentLayer =
    slides[currentSlide].dataset.layer;
  
    const menuDisabled =
    slides[currentSlide]
      .dataset.menuDisabled === "true";
  
  menuHotspot.style.display =
    (
      currentLayer === "optional1" ||
      menuDisabled
    )
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
  if (index === currentSlide) return;

  const currentLayer =
  slides[currentSlide].dataset.layer;

const targetLayer =
  slides[index].dataset.layer;





  isAnimating = true;

  const previousSlide = currentSlide;

 

  currentSlide = index;

slides[currentSlide].classList.add("active");

if (closingOptional) {

    slides[currentSlide]
      .style.transition = "none";
  
  }

requestAnimationFrame(() => {

  slides[previousSlide]
    .classList.remove("active");

});

updateUIState();

localStorage.setItem("btc-slide", currentSlide);

  
  if (openingOptional && index === 26) {

    slides[index].classList.add("optional-opening");
  
  }





  setTimeout(() => {

    slides[index].classList.remove("optional-opening");
  
    openingOptional = false;
  
  }, 600);


  setTimeout(() => {

    slides[currentSlide]
      .style.transition = "";
  
    closingOptional = false;
  
    isAnimating = false;
  
  }, 400);
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

  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener("touchstart", (event) => {

    touchStartY = event.changedTouches[0].screenY;
  
  });

  window.addEventListener("touchend", (event) => {

    if (isAnimating) return;
  
    touchEndY =
      event.changedTouches[0].screenY;
  
    const swipeDistance =
      touchStartY - touchEndY;

      const currentLayer =
  slides[currentSlide].dataset.layer;

  if (swipeDistance > 30) {

    const nextSlide = currentSlide + 1;
  
    const nextLayer =
      slides[nextSlide]?.dataset.layer;
  
   
  
  
  
    if (
      currentLayer === "optional1" &&
      nextLayer !== "optional1"
    ) {
  
      return;
  
    }

    if (
      currentLayer === "layer1" &&
      nextLayer === "optional1"
    ) {
    
      return;
    
    }

    if (
      currentLayer === "layer2" &&
      nextLayer === "source"
    ) {
    
      return;
    
    }
  
    showSlide(nextSlide);
  
  }

  else if (swipeDistance < -30) {

    const previousSlide =
      currentSlide - 1;
  
    const previousLayer =
      slides[previousSlide]?.dataset.layer;
  
 
  
    if (
      currentLayer === "optional1" &&
      previousLayer !== "optional1"
    ) {
  
      return;
  
    }


    if (
      currentLayer === "layer2" &&
      previousLayer === "optional1"
    ) {
    
      const lastLayer1 =
        [...slides]
          .map((slide, i) =>
            slide.dataset.layer === "layer1"
              ? i
              : -1
          )
          .filter(i => i !== -1)
          .pop();
    
      showSlide(lastLayer1);
    
      return;
    
    }
  
    showSlide(previousSlide);
  
  }
  
  });

  let wheelTriggered = false;

  window.addEventListener("wheel", (event) => {
  
    event.preventDefault();
  
    if (isAnimating) return;
  
    const direction =
      Math.sign(event.deltaY);
  
    if (direction === 0) return;
  
    if (wheelTriggered) return;
  
    wheelTriggered = true;
  
    setTimeout(() => {
  
      wheelTriggered = false;
  
    }, 120);
  
    const currentLayer =
      slides[currentSlide].dataset.layer;
  
    if (direction > 0) {
  
      const nextSlide =
        currentSlide + 1;
  
      const nextLayer =
        slides[nextSlide]?.dataset.layer;
  
      if (
        currentLayer === "optional1" &&
        nextLayer !== "optional1"
      ) {
  
        return;
  
      }
  
      if (
        currentLayer === "layer1" &&
        nextLayer === "optional1"
      ) {
  
        return;
  
      }
  
      if (
        currentLayer === "layer2" &&
        nextLayer === "source"
      ) {
  
        return;
  
      }
  
      showSlide(nextSlide);
  
    }
  
    else {
  
      const previousSlide =
        currentSlide - 1;
  
      const previousLayer =
        slides[previousSlide]?.dataset.layer;
  
      if (
        currentLayer === "optional1" &&
        previousLayer !== "optional1"
      ) {
  
        return;
  
      }
  
      if (
        currentLayer === "layer2" &&
        previousLayer === "optional1"
      ) {
  
        const lastLayer1 =
          [...slides]
            .map((slide, i) =>
              slide.dataset.layer === "layer1"
                ? i
                : -1
            )
            .filter(i => i !== -1)
            .pop();
  
        showSlide(lastLayer1);
  
        return;
  
      }
  
      showSlide(previousSlide);
  
    }
  
  }, { passive: false });

  

const menuHotspot = document.querySelector(".menu-hotspot");

const menuNavigationHotspots =
  document.querySelectorAll(
    ".menu-hotspot-layer [data-target]"
  );

menuHotspot.addEventListener("click", () => {
  openMenu();
});

menuNavigationHotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {
  
      closeMenu();
  
      const targetLayer =
        hotspot.dataset.target;
  
      const targetSlide =
        [...slides].findIndex(
          slide =>
            slide.dataset.layer === targetLayer
        );
  
      showSlide(targetSlide);
  
    });
  
  });



const closeHotspot = document.querySelector(".close-hotspot");
const optionalCloseHotspots = document.querySelectorAll(".optional-close-hotspot");
const optionalContinueHotspot =
  document.querySelector(
    ".optional-continue-hotspot"
  );
  optionalCloseHotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {
  
      const returnTarget =
        [...slides].findIndex(
          slide =>
            slide.dataset.entry ===
            "optional1-trigger"
        );
  
        closingOptional = true;
      showSlide(returnTarget);
  
    });
  
  });
  
  optionalContinueHotspot
    .addEventListener("click", () => {
  
      const continueTarget =
        [...slides].findIndex(
          slide =>
            slide.dataset.entry ===
            "post-optional-main"
        );
  
      showSlide(continueTarget);
  
    });

closeHotspot.addEventListener("click", () => {
  closeMenu();
});

slides[currentSlide].classList.add("active");
updateUIState();

window.addEventListener("keydown", (event) => {
    if (isAnimating) return;

const currentLayer =
  slides[currentSlide].dataset.layer;

  if (
  event.key === "ArrowDown"
) {

  const nextSlide =
    currentSlide + 1;

  const nextLayer =
    slides[nextSlide]?.dataset.layer;



  if (
    currentLayer === "optional1" &&
    nextLayer !== "optional1"
  ) {

    return;

  }

  if (
    currentLayer === "layer1" &&
    nextLayer === "optional1"
  ) {
  
    return;
  
  }

  if (
    currentLayer === "layer2" &&
    nextLayer === "source"
  ) {
  
    return;
  
  }

  showSlide(nextSlide);

}

else if (
    event.key === "ArrowUp"
  ) {
  
    const previousSlide =
      currentSlide - 1;
  
    const previousLayer =
      slides[previousSlide]?.dataset.layer;
  
   
  
    if (
      currentLayer === "optional1" &&
      previousLayer !== "optional1"
    ) {
  
      return;
  
    }

    if (
      currentLayer === "layer2" &&
      previousLayer === "optional1"
    ) {
    
      const lastLayer1 =
        [...slides]
          .map((slide, i) =>
            slide.dataset.layer === "layer1"
              ? i
              : -1
          )
          .filter(i => i !== -1)
          .pop();
    
      showSlide(lastLayer1);
    
      return;
    
    }
  
    showSlide(previousSlide);
  
  }

});