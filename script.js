// ==============================
// TYPEWRITER EFFECT
// ==============================

const roles = [
  "Frontend Developer",
  "Java Developer",
  "Full Stack Developer",
  "Web Developer"
];

const textElement = document.getElementById("changing-text");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    textElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    textElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

if (textElement) typeEffect();


// ==============================
// SKILL BAR ANIMATION
// ==============================

const bars = document.querySelectorAll(".bar div");

function animateSkills() {
  bars.forEach(bar => {
    const position = bar.getBoundingClientRect().top;

    if (position < window.innerHeight - 50 && !bar.classList.contains("animated")) {
      bar.style.width = bar.getAttribute("data-width");
      bar.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateSkills);


// ==============================
// GOOGLE SHEETS CONTACT FORM (FINAL WORKING)
// ==============================

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    const submitBtn = form.querySelector("button");

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;
    formMessage.innerText = "";

    fetch("https://script.google.com/macros/s/AKfycbxwlnIVJHMrqyOIIQ9jVGC96nEXzgtrYJ7aTFETdBpK3vEGpiQJUBMQRAHWwgeIKKny/exec", {
      method: "POST",
      mode: "no-cors",   // Prevents CORS network error
      body: new FormData(form)
    })
    .then(() => {

      formMessage.style.color = "#c084fc";
      formMessage.innerText = "Message sent successfully ✓";

      form.reset();
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;

    })
    .catch(() => {

      formMessage.style.color = "red";
      formMessage.innerText = "Something went wrong. Please try again.";

      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;

    });

  });

}


// ==============================
// MOBILE MENU TOGGLE
// ==============================

const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});