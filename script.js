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
    
  }

  function closeMenu() {

    slides[currentSlide].classList.add("active");
    updateUIState();
  
    currentMenu.classList.remove("active");
  
    
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

  const menuCloseHotspots =
  document.querySelectorAll(
    ".menu-close-hotspot"
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


  menuCloseHotspots.forEach(hotspot => {

    hotspot.addEventListener("click", () => {
  
      closeMenu();
  
    });
  
  });



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


const loadingOverlay =
  document.getElementById("loading-overlay");

const loadingBar =
  document.getElementById("loading-bar");


  const allImages =
  document.querySelectorAll("img");


const totalImages =
  allImages.length;


let decodedImages = 0;
loadingBar.style.width = "20%";


async function trackImageProgress() {

  for (const img of allImages) {

    try {

      if (!img.complete) {

        await new Promise(resolve => {

          img.onload = resolve;
          img.onerror = resolve;

        });

      }

      await img.decode();

    }

    catch(error) {

    }

    

    decodedImages++;


    const progress =
  20 + (
    (decodedImages / totalImages) * 72
  );


  requestAnimationFrame(() => {

    loadingBar.style.width =
      progress + "%";
  
  });

  }

  loadingBar.style.width = "100%";
  loadingOverlay.style.opacity = "0";


  setTimeout(() => {

    loadingOverlay.style.display = "none";

  }, 600);

}


window.addEventListener(
  "load",
  () => {

    trackImageProgress();

  }
);






function updateImageWrappers() {

  const wrappers =
  document.querySelectorAll(".image-wrapper");


  const viewportWidth =
    window.innerWidth;

  const viewportHeight =
    window.innerHeight;


  const artworkRatio =
    2000 / 4050;


    const viewportRatio =
    viewportWidth / viewportHeight;
  
  
  let wrapperWidth;
  let wrapperHeight;
  
  
  if (viewportRatio > artworkRatio) {
  
    wrapperHeight =
      viewportHeight * 0.985;
  
    wrapperWidth =
      wrapperHeight * artworkRatio;
  
  }
  
  else {
  
    wrapperWidth =
      viewportWidth * 0.985;
  
    wrapperHeight =
      wrapperWidth / artworkRatio;
  
  }


  wrappers.forEach(wrapper => {

  wrapper.style.width =
    wrapperWidth + "px";

  wrapper.style.height =
    wrapperHeight + "px";

});

}

window.addEventListener(
  "load",
  updateImageWrappers
);

window.addEventListener(
  "resize",
  updateImageWrappers
);


window.addEventListener(
  "load",
  positionHotspot23
);

window.addEventListener(
  "resize",
  positionHotspot23
);

window.addEventListener(
  "load",
  positionOptionalCloseHotspots
);

window.addEventListener(
  "resize",
  positionOptionalCloseHotspots
);


window.addEventListener(
  "load",
  positionOptionalContinueHotspot
);

window.addEventListener(
  "resize",
  positionOptionalContinueHotspot
);


window.addEventListener(
  "load",
  positionLayer2Hotspot
);

window.addEventListener(
  "resize",
  positionLayer2Hotspot
);


window.addEventListener(
  "load",
  positionSourceHotspot
);

window.addEventListener(
  "resize",
  positionSourceHotspot
);



window.addEventListener(
  "load",
  positionMenuLayer1Hotspots
);

window.addEventListener(
  "resize",
  positionMenuLayer1Hotspots
);

window.addEventListener(
  "load",
  positionMenuLayer2Hotspots
);

window.addEventListener(
  "resize",
  positionMenuLayer2Hotspots
);

window.addEventListener(
  "load",
  positionMenuSourceHotspots
);

window.addEventListener(
  "resize",
  positionMenuSourceHotspots
);


window.addEventListener(
  "load",
  positionAmazonHotspot
);

window.addEventListener(
  "resize",
  positionAmazonHotspot
);


window.addEventListener(
  "load",
  positionEmailHotspot
);

window.addEventListener(
  "resize",
  positionEmailHotspot
);

window.addEventListener(
  "load",
  positionMenuCloseHotspots
);

window.addEventListener(
  "resize",
  positionMenuCloseHotspots
);



function positionHotspot23() {

  const wrapper =
    document.querySelector(
      '[data-entry="optional1-trigger"] .image-wrapper'
    );

  const hotspot =
    document.querySelector(".hotspot-23");


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (380 * scaleX) + "px";

  hotspot.style.top =
    (3390 * scaleY) + "px";

  hotspot.style.width =
    (500 * scaleX) + "px";

  hotspot.style.height =
    (250 * scaleY) + "px";

    hotspot.style.background =
  "transparent";

}



function positionOptionalCloseHotspots() {

  const wrappers =
    document.querySelectorAll(
      '[data-layer="optional1"] .image-wrapper'
    );

  const hotspots =
    document.querySelectorAll(
      ".optional-close-hotspot"
    );


  wrappers.forEach((wrapper, index) => {

    const hotspot =
      hotspots[index];


    const wrapperWidth =
      wrapper.clientWidth;

    const wrapperHeight =
      wrapper.clientHeight;


    const scaleX =
      wrapperWidth / 2000;

    const scaleY =
      wrapperHeight / 4050;


    hotspot.style.left =
      (1680 * scaleX) + "px";

    hotspot.style.top =
      (0 * scaleY) + "px";

    hotspot.style.width =
      (320 * scaleX) + "px";

    hotspot.style.height =
      (280 * scaleY) + "px";


    hotspot.style.background =
      "transparent";

  });

}



function positionOptionalContinueHotspot() {

  const wrapper =
    document.querySelector(
      '.optional-continue-hotspot'
    ).closest('.image-wrapper');

  const hotspot =
    document.querySelector(
      '.optional-continue-hotspot'
    );


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (1000 * scaleX) + "px";

  hotspot.style.bottom =
    (80 * scaleY) + "px";

  hotspot.style.width =
    (900 * scaleX) + "px";

  hotspot.style.height =
    (300 * scaleY) + "px";


  hotspot.style.background =
    "transparent";

}


function positionLayer2Hotspot() {

  const wrapper =
    document.querySelector(
      '[data-layer="layer1"] .layer2-hotspot'
    ).closest('.image-wrapper');

  const hotspot =
    document.querySelector(
      '.layer2-hotspot'
    );


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (1000 * scaleX) + "px";

  hotspot.style.bottom =
    (80 * scaleY) + "px";

  hotspot.style.width =
    (900 * scaleX) + "px";

  hotspot.style.height =
    (300 * scaleY) + "px";


  hotspot.style.background =
    "transparent";

}


function positionSourceHotspot() {

  const wrapper =
    document.querySelector(
      '.source-hotspot'
    ).closest('.image-wrapper');

  const hotspot =
    document.querySelector(
      '.source-hotspot'
    );


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (1000 * scaleX) + "px";

  hotspot.style.bottom =
    (80 * scaleY) + "px";

  hotspot.style.width =
    (900 * scaleX) + "px";

  hotspot.style.height =
    (300 * scaleY) + "px";


  hotspot.style.background =
    "transparent";

}


function positionMenuLayer1Hotspots() {

  const hotspots =
    document.querySelectorAll(
      '.menu-layer1-hotspot, .menu2-layer1-hotspot, .menus-layer1-hotspot'
    );


  hotspots.forEach(hotspot => {

    const wrapper =
      hotspot.closest('.image-wrapper');


    const wrapperWidth =
      wrapper.clientWidth;

    const wrapperHeight =
      wrapper.clientHeight;


    const scaleX =
      wrapperWidth / 2000;

    const scaleY =
      wrapperHeight / 4050;


    hotspot.style.left =
      (700 * scaleX) + "px";

    hotspot.style.top =
      (1600 * scaleY) + "px";

    hotspot.style.width =
      (600 * scaleX) + "px";

    hotspot.style.height =
      (260 * scaleY) + "px";


    hotspot.style.background =
     "transparent";

  });

}


function positionMenuLayer2Hotspots() {

  const hotspots =
    document.querySelectorAll(
      '.menu-layer2-hotspot, .menu2-layer2-hotspot, .menus-layer2-hotspot'
    );


  hotspots.forEach(hotspot => {

    const wrapper =
      hotspot.closest('.image-wrapper');


    const wrapperWidth =
      wrapper.clientWidth;

    const wrapperHeight =
      wrapper.clientHeight;


    const scaleX =
      wrapperWidth / 2000;

    const scaleY =
      wrapperHeight / 4050;


    hotspot.style.left =
      (700 * scaleX) + "px";

    hotspot.style.top =
      (1910 * scaleY) + "px";

    hotspot.style.width =
      (600 * scaleX) + "px";

    hotspot.style.height =
      (260 * scaleY) + "px";


    hotspot.style.background =
      "transparent";

  });

}


function positionMenuSourceHotspots() {

  const hotspots =
    document.querySelectorAll(
      '.menu-source-hotspot, .menu2-source-hotspot, .menus-source-hotspot'
    );


  hotspots.forEach(hotspot => {

    const wrapper =
      hotspot.closest('.image-wrapper');


    const wrapperWidth =
      wrapper.clientWidth;

    const wrapperHeight =
      wrapper.clientHeight;


    const scaleX =
      wrapperWidth / 2000;

    const scaleY =
      wrapperHeight / 4050;


    hotspot.style.left =
      (710 * scaleX) + "px";

    hotspot.style.top =
      (2210 * scaleY) + "px";

    hotspot.style.width =
      (600 * scaleX) + "px";

    hotspot.style.height =
      (260 * scaleY) + "px";


    hotspot.style.background =
      "transparent";

  });

}




function positionAmazonHotspot() {

  const wrapper =
    document.querySelector(
      '.amazon-hotspot'
    ).closest('.image-wrapper');

  const hotspot =
    document.querySelector(
      '.amazon-hotspot'
    );


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (600 * scaleX) + "px";

  hotspot.style.top =
    (1520 * scaleY) + "px";

  hotspot.style.width =
    (800 * scaleX) + "px";

  hotspot.style.height =
    (280 * scaleY) + "px";


  hotspot.style.background =
    "transparent";

}



function positionEmailHotspot() {

  const wrapper =
    document.querySelector(
      '.email-hotspot'
    ).closest('.image-wrapper');

  const hotspot =
    document.querySelector(
      '.email-hotspot'
    );


  const wrapperWidth =
    wrapper.clientWidth;

  const wrapperHeight =
    wrapper.clientHeight;


  const scaleX =
    wrapperWidth / 2000;

  const scaleY =
    wrapperHeight / 4050;


  hotspot.style.left =
    (550 * scaleX) + "px";

  hotspot.style.top =
    (3620 * scaleY) + "px";

  hotspot.style.width =
    (880 * scaleX) + "px";

  hotspot.style.height =
    (160 * scaleY) + "px";


  hotspot.style.background =
    "transparent";

}


function positionMenuCloseHotspots() {

  const hotspots =
    document.querySelectorAll(
      '.menu-close-hotspot'
    );


  hotspots.forEach(hotspot => {

    const wrapper =
      hotspot.closest('.image-wrapper');


    const wrapperWidth =
      wrapper.clientWidth;

    const wrapperHeight =
      wrapper.clientHeight;


    const scaleX =
      wrapperWidth / 2000;

    const scaleY =
      wrapperHeight / 4050;


    hotspot.style.left =
      (780 * scaleX) + "px";

    hotspot.style.top =
      (3550 * scaleY) + "px";

    hotspot.style.width =
      (420 * scaleX) + "px";

    hotspot.style.height =
      (320 * scaleY) + "px";


    hotspot.style.background =
      "transparent";

  });

}