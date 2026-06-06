/* =========================
   TYPING ANIMATION
========================= */

const roles = [
  "Web Developer",
  "Full Stack Developer",
  "Cybersecurity Enthusiast",
  "Java Developer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingElement.textContent =
      currentRole.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {

    typingElement.textContent =
      currentRole.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex++;

      if (roleIndex >= roles.length) {
        roleIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 100);
}

typeEffect();

/* =========================
   CURSOR GLOW EFFECT
========================= */

// const glow = document.querySelector(".cursor-glow");

// document.addEventListener("mousemove", (e) => {

//   if (!glow) return;

//   glow.style.left = e.clientX + "px";
//   glow.style.top = e.clientY + "px";

// });

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(
".section, .timeline-item, .skill-box, .service-card, .project-card, .experience-card"
);

function revealOnScroll() {

  revealElements.forEach((element) => {

    const windowHeight =
      window.innerHeight;

    const revealTop =
      element.getBoundingClientRect().top;

    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }

  });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

/* =========================
   BACK TO TOP BUTTON
========================= */

const topBtn =
document.createElement("button");

topBtn.id = "topBtn";

topBtn.innerHTML =
'<i class="fas fa-arrow-up"></i>';

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    topBtn.classList.add("show");

  } else {

    topBtn.classList.remove("show");

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});

/* =========================
   ACTIVE NAV LINK
========================= */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop;

    if (
      scrollY >= sectionTop - 200
    ) {
      current =
        section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") ===
      "#" + current
    ) {

      link.classList.add("active");

    }

  });

});

/* =========================
   SMOOTH SCROLL
========================= */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

  anchor.addEventListener(
    "click",
    function (e) {

      e.preventDefault();

      const target =
        document.querySelector(
          this.getAttribute("href")
        );

      if (target) {

        target.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

});

/* =========================
   FLOATING ANIMATION
========================= */

const cards =
document.querySelectorAll(
".project-card, .service-card"
);

cards.forEach((card) => {

  card.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        (y - centerY) / 25;

      const rotateY =
        (centerX - x) / 25;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    }
  );

  card.addEventListener(
    "mouseleave",
    () => {

      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";

    }
  );

});

/* =========================
   COUNTER ANIMATION
========================= */

const counters =
document.querySelectorAll(
".stat-card h3"
);

const speed = 80;

counters.forEach(counter => {

  const updateCount = () => {

    const target =
      parseInt(
        counter.innerText
          .replace("+","")
          .replace("/7","24")
      );

    const count =
      +counter.getAttribute("data-count") || 0;

    const increment =
      target / speed;

    if (count < target) {

      const newCount =
        Math.ceil(count + increment);

      counter.setAttribute(
        "data-count",
        newCount
      );

      counter.innerText =
        newCount + "+";

      setTimeout(updateCount, 30);

    }

  };

  updateCount();

});

/* =========================
   SIMPLE PARTICLES
========================= */

const canvas =
document.createElement("canvas");

canvas.id = "particleCanvas";

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-2";
canvas.style.pointerEvents = "none";

document.body.appendChild(canvas);

const ctx =
canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

}

resizeCanvas();

window.addEventListener(
"resize",
resizeCanvas
);

for (let i = 0; i < 80; i++) {

  particles.push({

    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,

    radius: Math.random() * 2 + 1,

    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6

  });

}

function animateParticles() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach((p) => {

    p.x += p.dx;
    p.y += p.dy;

    if (
      p.x < 0 ||
      p.x > canvas.width
    ) p.dx *= -1;

    if (
      p.y < 0 ||
      p.y > canvas.height
    ) p.dy *= -1;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      "rgba(0,191,255,0.7)";

    ctx.fill();

  });

  requestAnimationFrame(
    animateParticles
  );

}

animateParticles();