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
// Función para mostrar las publicaciones guardadas en el almacenamiento local
function mostrarPublicacionesGuardadas() {
  // Obtener las publicaciones guardadas del almacenamiento local
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Obtener el contenedor de publicaciones
  const postsContainer = document.getElementById("postsContainer");

  // Limpiar el contenedor de publicaciones antes de mostrar las publicaciones guardadas
  postsContainer.innerHTML = "";

  // Mostrar las publicaciones guardadas
  storedPosts.forEach((post, index) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `<p><strong>${post.userName}:</strong> ${post.userTip}</p>`;
      
      // Crear botón de eliminar
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Eliminar";
      deleteButton.classList.add("delete__button");
      // Añadir evento de clic para eliminar publicación
      deleteButton.addEventListener("click", () => eliminarPublicacion(index));
      
      postElement.appendChild(deleteButton);
      
      postsContainer.appendChild(postElement);
  });
}

// Función para manejar el envío del formulario
document.getElementById("forumForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  // Obtener los valores de los campos de entrada
  const userName = document.getElementById("userName").value;
  const userTip = document.getElementById("userTip").value;

  // Crear un objeto para representar la publicación
  const post = { userName, userTip };

  // Obtener las publicaciones guardadas del almacenamiento local
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Agregar la nueva publicación a las publicaciones guardadas
  storedPosts.push(post);

  // Guardar las publicaciones actualizadas en el almacenamiento local
  localStorage.setItem("posts", JSON.stringify(storedPosts));

  // Mostrar las publicaciones guardadas (incluyendo la nueva publicación)
  mostrarPublicacionesGuardadas();

  // Limpiar los campos del formulario
  this.reset();
});

// Función para eliminar una publicación
function eliminarPublicacion(index) {
  // Obtener las publicaciones guardadas del almacenamiento local
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Eliminar la publicación en el índice especificado
  storedPosts.splice(index, 1);

  // Guardar las publicaciones actualizadas en el almacenamiento local
  localStorage.setItem("posts", JSON.stringify(storedPosts));

  // Mostrar las publicaciones actualizadas
  mostrarPublicacionesGuardadas();
}

// Mostrar las publicaciones guardadas al cargar la página
mostrarPublicacionesGuardadas();

// Función para cambiar el tema
const changeTheme = () => {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  if (body.classList.contains("light-theme")) {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeIcon.textContent = "🌞"; // Icono de sol
  } else {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeIcon.textContent = "🌙"; // Icono de luna
  }
};

// Agregar evento de click al botón de tema
const themeButton = document.getElementById("themeButton");
themeButton.addEventListener("click", changeTheme);

// Inicializar tema
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  // Verificar el tema actual y ajustar el icono
  if (body.classList.contains("light-theme")) {
    themeIcon.textContent = "🌙"; // Icono de luna
  } else {
    themeIcon.textContent = "🌞"; // Icono de sol
  }
});
