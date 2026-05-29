const slides = document.querySelectorAll(".slide:not(.menu-slide)");

const batch1Images = [

  // MENU
  "slides/menu-1.png",
  "slides/menu-2.png",
  "slides/menu-s.png",

  // SOURCE
  "slides/source.png",

  // LAYER 1
  "slides/layer-1/1.png",
  "slides/layer-1/2.png",
  "slides/layer-1/3.png",
  "slides/layer-1/4.png",
  "slides/layer-1/new-1.png",
  "slides/layer-1/5.png",
  "slides/layer-1/6.png",
  "slides/layer-1/7.png",
  "slides/layer-1/8.png",
  "slides/layer-1/9.png",
  "slides/layer-1/10.png",
  "slides/layer-1/11.png",
  "slides/layer-1/12.png",
  "slides/layer-1/13.png",
  "slides/layer-1/14.png",
  "slides/layer-1/15.png",

  // LAYER 2
  "slides/layer-2/1.png",
  "slides/layer-2/2.png",
  "slides/layer-2/3.png",
  "slides/layer-2/4.png",
  "slides/layer-2/5.png",
  "slides/layer-2/6.png",
  "slides/layer-2/7.png",
  "slides/layer-2/8.png",
  "slides/layer-2/9.png",
  "slides/layer-2/10.png"

];


const batch2Images = [

  // OPTIONAL
  "slides/layer-o/1.png",
  "slides/layer-o/2.png",
  "slides/layer-o/3.png",
  "slides/layer-o/4.png",
  "slides/layer-o/5.png",
  "slides/layer-o/6.png",
  "slides/layer-o/7.png",

  // REMAINING LAYER 1
  "slides/layer-1/16.png",
  "slides/layer-1/17.png",
  "slides/layer-1/18.png",
  "slides/layer-1/19.png",
  "slides/layer-1/20.png",
  "slides/layer-1/21.png",
  "slides/layer-1/22.png",
  "slides/layer-1/23.png",
  "slides/layer-1/24.png",
  "slides/layer-1/25.png",
  "slides/layer-1/26.png",
  "slides/layer-1/27.png",
  "slides/layer-1/28.png",

  // REMAINING LAYER 2
  "slides/layer-2/11.png",
  "slides/layer-2/12.png",
  "slides/layer-2/13.png",
  "slides/layer-2/14.png",
  "slides/layer-2/15.png",
  "slides/layer-2/16.png",
  "slides/layer-2/17.png",
  "slides/layer-2/18.png",
  "slides/layer-2/19.png",
  "slides/layer-2/20.png",
  "slides/layer-2/21.png",
  "slides/layer-2/22.png",
  "slides/layer-2/23.png",
  "slides/layer-2/24.png",
  "slides/layer-2/25.png",
  "slides/layer-2/26.png",
  "slides/layer-2/27.png",
  "slides/layer-2/28.png",
  "slides/layer-2/29.png",
  "slides/layer-2/30.png",
  "slides/layer-2/31.png",
  "slides/layer-2/32.png",
  "slides/layer-2/33.png"

];


function preloadImages(imageArray, callback) {

  let loadedCount = 0;

  imageArray.forEach((src) => {

    const img = new Image();

    img.src = src;

    img.onload = () => {

      loadedCount++;

      if (loadedCount === imageArray.length) {

        callback();

      }

    };

  });

}

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

  
if (
  openingOptional &&
  slides[index].dataset.layer === "optional1"
) {

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
  
  }, 850);

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

  

  window.addEventListener("wheel", (event) => {
  
    
    if (isAnimating) return;
  
  
    
  

  

  
    const currentLayer =
      slides[currentSlide].dataset.layer;
  
      if (event.deltaY > 5) {
  
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
  
    else if (event.deltaY < -5) {
  
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

preloadImages(batch1Images, () => {

  slides[currentSlide].classList.add("active");

  updateUIState();

  preloadImages(batch2Images, () => {

    console.log("Batch 2 loaded");

  });

});

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