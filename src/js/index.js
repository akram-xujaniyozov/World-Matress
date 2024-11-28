"use strict";

window.addEventListener("load", function () {
  document.documentElement.scrollIntoView({ behavior: "smooth" });
});

// Leaflet library map
const success = function (position) {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude];
  const map = L.map("map", {
    scrollWheelZoom: false,
  }).setView(coords, 13);

  const myIcon = L.icon({
    iconUrl: "../../assets/images/map-marker.svg",
    iconSize: [35, 45],
    iconAnchor: [35, 50],
    popupAnchor: [-16, -90],
  });

  L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords, { icon: myIcon })
    .addTo(map)
    .bindPopup(
      L.popup({
        content: "Shop World Matress",
        closeOnClick: false,
        maxWidth: 300,
        minWidth: 150,
      })
    )
    .openPopup();

  map.on("focus", function () {
    map.scrollWheelZoom.enable();
  });
  map.on("blur", function () {
    map.scrollWheelZoom.disable();
  });
};

const error = function (err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
}

// Selecting elements
// Header elements
const header = document.getElementById("header");
const headerWrapper = document.querySelector(".header__wrapper");
const headerTitle = document.querySelector(".header__title");
const headerVoting = document.querySelector(".header__voting");
const headerOptions = document.querySelector(".header__options");
const headerBtn = document.querySelector(".header__btn");
const headerGallery = document.querySelector(".header__gallery");
const headerService = document.querySelector(".header__service");

// Call
const call = document.querySelector(".call");

// Main element
const main = document.querySelector(".main-home");

// Catalogs Block
const catalogsBlock = document.querySelector(".catalogs__block");
const catalogsWrapper = document.querySelectorAll(".catalogs__wrapper");

// About detail item
const aboutItems = document.querySelectorAll(".about__detail-item");

// Number popup
const numberPopupCard = document.querySelector(".number-popup__card");
const numberPopupBackdrop = document.querySelector(".number-popup__backdrop");
const numberPopupCardClose = document.querySelector(
  ".number-popup__card .close"
);
const numberPopupCardForm = document.querySelector(".number-popup__card form");

// Question popup
const questionPopupCont = document.querySelector(".question-popup__container");
const questionPopupCards = document.querySelectorAll(".question-popup__card");
const questionPopupBackdrop = document.querySelector(
  ".question-popup__backdrop"
);
const questionNextBtns = document.querySelectorAll(
  ".question-popup__btn--next"
);
const questionBackBtns = document.querySelectorAll(
  ".question-popup__btn--back"
);
const questionCloseBtn = document.querySelector(".question-popup__btn--close");
const questionPopupCloses = questionPopupCont.querySelectorAll(".close");
const questionAcceptBtn = document.querySelector(
  ".question-popup__last-btn--accept"
);
const questionProgress = document.querySelectorAll(".question-popup__progress");

// Response Popup
const responsePopupBackdrop = document.querySelector(
  ".response-popup__backdrop"
);
const responsePopupCard = document.querySelector(".response-popup__card");
const responsePopupBtn = document.querySelector(".response-popup__btn");

// Scroll Up
const scrollUp = document.querySelector(".scroll-up");

// function open popup
function openPopup(card, backdrop) {
  card.classList.remove("fade-up");
  backdrop.classList.remove("hidden");
}

// function hide popup
function hidePopup(card, backdrop, e) {
  e.preventDefault();
  card.classList.add("fade-up");
  backdrop.classList.add("hidden");
}

/////////////////////////////////////////////////
// Catalogs open and hide features

// Catalog btns open popup features
catalogsBlock.addEventListener("click", function (e) {
  e.preventDefault();
  const el = e.target;
  if (el.nodeName === "BUTTON") {
    openPopup(numberPopupCard, numberPopupBackdrop);
  }
});
// Catalog btns hide popup features
[numberPopupCardClose, numberPopupBackdrop].forEach((el) =>
  el.addEventListener(
    "click",
    hidePopup.bind(null, numberPopupCard, numberPopupBackdrop)
  )
);
numberPopupCardForm.addEventListener(
  "submit",
  hidePopup.bind(null, numberPopupCard, numberPopupBackdrop)
);

////////////////////////////////////////////////////
// Window loaded elements features
const classMoveRight = "to-right";
const classMoveLeft = "to-left";
const classMoveTop = "to-top";
const countTime = 500;

function moveToward(el, className) {
  el.classList.remove(className);
}

function movingElement(moveElement, moveClass, timer) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(moveToward(moveElement, moveClass));
    }, timer);
  });
}

window.addEventListener("load", async function () {
  await movingElement(headerTitle, classMoveRight, countTime);
  await movingElement(headerVoting, classMoveRight, countTime);
  await movingElement(headerOptions, classMoveRight, countTime);
  await movingElement(headerBtn, classMoveRight, countTime);
  await movingElement(headerGallery, classMoveLeft, countTime);
  await movingElement(call, classMoveLeft, countTime);
  await movingElement(headerService, classMoveTop, countTime);
});

/////////////////////////////////////////////////////
// Scroll Up feature
window.addEventListener("scroll", function () {
  window.scrollY >= headerWrapper.getBoundingClientRect().height + 50
    ? scrollUp.classList.add("fade-down")
    : scrollUp.classList.remove("fade-down");
});

scrollUp.addEventListener("click", function () {
  header.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////////////////////
// Reveal elements function
const revealObserver = function (revealEls, elClass, threshold) {
  const revealElements = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove(elClass);
    observer.unobserve(entry.target);
  };

  const elementObserver = new IntersectionObserver(revealElements, {
    root: null,
    threshold,
  });

  revealEls.forEach(function (el) {
    elementObserver.observe(el);
    el.classList.add(elClass);
  });
};

// Catalogs reveal feature using Intersection Observer
const revealCatalogs = function (element, className, threshold) {
  revealObserver(element, className, threshold);
};
revealCatalogs(catalogsWrapper, classMoveTop, 0.2);

// About reveal items using Intersection Observer
const revealAboutItems = function (elements, className, threshold) {
  revealObserver(elements, className, threshold);
};
revealAboutItems(aboutItems, classMoveTop, 0.1);

/////////////////////////////////////////////////////////////////
// Question popup features
function toggleQuestionPopup() {
  [questionPopupBackdrop, questionPopupCont].forEach((el) =>
    el.classList.toggle("hidden")
  );
}
// Open question popup
headerBtn.firstElementChild.addEventListener("click", toggleQuestionPopup);
// Close question popup
questionPopupCloses.forEach((btn) =>
  btn.addEventListener("click", toggleQuestionPopup)
);
questionPopupBackdrop.addEventListener("click", toggleQuestionPopup);
questionCloseBtn.addEventListener("click", toggleQuestionPopup);

document.addEventListener("keydown", function (e) {
  // Open question popup
  e.ctrlKey &&
    e.keyCode === 66 &&
    questionPopupCont.classList.contains("hidden") &&
    toggleQuestionPopup();

  // Close question popup
  e.key === "Escape" &&
    !questionPopupCont.classList.contains("hidden") &&
    toggleQuestionPopup();
});

/////////////////////////////////////////////////////
// Slider features
function slider() {
  // Slider counter
  let curSlide = 0;
  const maxSlide = questionPopupCards.length;

  // Progress computing
  const progressParentWidth = questionProgress[0].parentElement.offsetWidth;
  const dividedProgress = progressParentWidth / maxSlide;
  const percentPerProgress = (dividedProgress * 100) / progressParentWidth;

  // goToSlide function
  function goToSlide(slide) {
    questionPopupCards.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  goToSlide(curSlide);

  function nextSlide() {
    // When curSlide is max index
    if (curSlide === maxSlide - 1) curSlide = maxSlide - 1;
    else curSlide++;
    goToSlide(curSlide);
    incrementProgress(curSlide);
  }

  function prevSlide() {
    // When curSlide is zero index
    if (!curSlide) curSlide = 0;
    else curSlide--;
    goToSlide(curSlide);
    incrementProgress(curSlide);
  }

  questionNextBtns.forEach((btn) => btn.addEventListener("click", nextSlide));
  questionBackBtns.forEach((btn) => btn.addEventListener("click", prevSlide));

  document.addEventListener("keydown", function (e) {
    e.code === "ArrowLeft" && prevSlide();
    e.code === "ArrowRight" && nextSlide();
  });

  // Increment progress line
  function incrementProgress(slide = 0) {
    questionProgress.forEach(
      (s) => (s.style.width = `${percentPerProgress * (slide + 1)}%`)
    );
  }
  incrementProgress();
}

slider();

/////////////////////////////////////////////////////////////
// Response popup features
// Open response popup
questionAcceptBtn.addEventListener("click", function () {
  toggleQuestionPopup();
  setTimeout(function () {
    openPopup(responsePopupCard, responsePopupBackdrop);
  }, 1200);
});

// Close response popup
responsePopupBtn.addEventListener(
  "click",
  hidePopup.bind(null, responsePopupCard, responsePopupBackdrop)
);
