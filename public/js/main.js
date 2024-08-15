// Text Animation

var typed = new Typed(".text", {
  strings: ["Web Designer", "Fullstack Developer", "Data Enthusiast"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// Toggle visibility of navbar when button clicked

const navToggle = document.querySelector(".navbar-toggle");
navToggle.addEventListener("click", function () {
  document.querySelector(".portfolio-navbar").classList.toggle("show");
});

// Tab interface for different section of resume

const resumeHeading = document.querySelector(".resume-heading");
const resumeItems = document.querySelectorAll(".resume-item");
const resumeTabs = document.querySelectorAll(".resume-tab");

resumeHeading.onclick = (event) => {
  event.preventDefault();
  const clickedItemId = event.target.dataset.id;
  if (clickedItemId) {
    resumeItems.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.parentElement.classList.add("active");

    resumeTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    const correspondingTab = document.getElementById(clickedItemId);
    correspondingTab.classList.add("active");
  }
};

// Navbar header sticky while scrolling

function stickyNav() {
  var headerHeight = document.querySelector("#about").offsetHeight / 2;
  var navbar = document.querySelector("header");
  var scrollValue = window.scrollY;

  if (scrollValue > headerHeight) {
    navbar.classList.add("header-sticky");
  } else if (scrollValue < headerHeight) {
    navbar.classList.remove("header-sticky");
  }
}

window.addEventListener("scroll", stickyNav);

// Initialize swiper.js for project slider

const swiper = new Swiper(".project-slider", {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".nextArrowBtn",
    prevEl: ".prevArrowBtn",
  },
  pagination: {
    el: ".swiper-pagination",
    renderBullet: function (index, className) {
      return '<li class="' + className + '"></li>';
    },
    clickable: true,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 567px
    567: {
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Initialize swiper.js for testimonial slider

const swiper1 = new Swiper(".testimonial-swiper", {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 567px
    567: {
      slidesPerView: 1,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 1,
      effect: "fade",
    },
  },
});

// Send Email

const msg = document.querySelector(".form-message");

(function () {
  //https://dashboard.emailjs.com/admin/account
  emailjs.init("_JwRzmmuGSoowklOI");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      // these IDs from the previous steps
      emailjs.sendForm("service_smmav9e", "template_dqierpn", this).then(
        function () {
          document.getElementById("contact-form").reset();
          document.querySelector(".loader").classList.remove("show");
          msg.innerHTML = "";
          msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
          msg.classList.add("show");
          setTimeout(() => msg.classList.remove("show"), 2000);
        },
        function (error) {
          document.querySelector(".loader").classList.toggle("show");
          msg.classList.add("show");
          msg.innerHTML += "<span class='error-msg'>Email Not Sent</span>";
        }
      );
    });
};

// Active link on page scroll

const sections = document.querySelectorAll("section[id]");

function scrollTracker() {
  const currentYScroll = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const id = section.getAttribute("id");
    const currentNavLink = document.querySelector(
      `header .portfolio-navbar a[href*="#${id}"]`
    );
    if (
      currentYScroll > sectionTop &&
      currentYScroll <= sectionTop + sectionHeight
    ) {
      currentNavLink.classList.add("active-link");
    } else {
      currentNavLink.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollTracker);

// Dark and Light Theme Toggle

function isLight() {
  return localStorage.getItem("dark-mode");
}

function toggleRootClass() {
  document.querySelector("body").classList.toggle("dark");
}

function toggleLocalStorageItem() {
  if (isLight()) {
    localStorage.removeItem("dark-mode");
  } else {
    localStorage.setItem("dark-mode", "set");
  }
}

if (isLight()) {
  toggleRootClass();
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  toggleLocalStorageItem();
  toggleRootClass();
});

// Scroll to top

const limit = 200;
const scrollTopBtn = document.querySelector("#scroll-top-btn");
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.addEventListener("scroll", function () {
  console.log(window.scrollY);
  scrollTopBtn.classList.toggle("visible", window.scrollY >= limit);
});

// Scroll reveal

const sr = ScrollReveal({
  // reset: true,
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(".about-intro, .project-slider", {
  origin: "left",
});
sr.reveal(
  ".resume-heading,.contact-info,.footer-contact,.testimonial-heading",
  {
    origin: "bottom",
  }
);
sr.reveal(".service-row", {
  origin: "bottom",
  interval: 800,
});
sr.reveal(".resume-body", {
  origin: "top",
});

// Spotlight Cursor With Gsap.js

gsap.registerPlugin(ScrollTrigger);

// Animation text
gsap.to(".two-color-text", {
  scrollTrigger: {
    trigger: ".two-color-text",
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none none",
  },
  color: "#84bcda",
  duration: 1,
});

document.body.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;

  gsap.set(".cursor", {
    x: clientX,
    y: clientY,
  });

  gsap.to(".shape", {
    x: clientX,
    y: clientY,
    stagger: -0.1,
  });
});

// Select the carousel elements
const carouselInner = document.querySelector(".carousel-inner");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

// Get the number of slides and the width of a single slide
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
let currentIndex = 0;

// Function to update the carousel position
function updateCarouselPosition() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const newTransformValue = -currentIndex * slideWidth;
  carouselInner.style.transform = `translateX(${newTransformValue}px)`;
}

// Function to handle the previous button click
function showPreviousSlide() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalSlides - 1; // Loop to the last slide
  }
  updateCarouselPosition();
}

// Function to handle the next button click
function showNextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // Loop to the first slide
  }
  updateCarouselPosition();
}

// Attach event listeners to the buttons
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// Initialize the carousel position
updateCarouselPosition();
