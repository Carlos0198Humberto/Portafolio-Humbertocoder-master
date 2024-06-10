/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".card__content", {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    968: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const forumForm = document.getElementById("forumForm");
  const userName = document.getElementById("userName");
  const userTip = document.getElementById("userTip");
  const postsContainer = document.getElementById("postsContainer");

  forumForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = userName.value.trim();
    const tip = userTip.value.trim();

    if (name && tip) {
      const post = document.createElement("div");
      post.classList.add("post");

      const postName = document.createElement("p");
      postName.classList.add("post__name");
      postName.textContent = name;

      const postMessage = document.createElement("p");
      postMessage.classList.add("post__message");
      postMessage.textContent = tip;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("post__delete-button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => {
        postsContainer.removeChild(post);
      });

      post.appendChild(postName);
      post.appendChild(postMessage);
      post.appendChild(deleteButton);

      postsContainer.appendChild(post);

      // Limpiar formulario
      userName.value = "";
      userTip.value = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  themeButton.addEventListener("click", () => {
    if (body.classList.contains("light-theme")) {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      themeIcon.textContent = "🌜"; // Icono para el tema oscuro
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      themeIcon.textContent = "🌞"; // Icono para el tema claro
    }
  });

  // Inicializar con el tema claro
  body.classList.add("light-theme");
});

