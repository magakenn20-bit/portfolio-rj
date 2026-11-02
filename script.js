const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const navigationLinks = document.querySelectorAll(".navigation a");
const currentYear = document.querySelector("#current-year");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");

menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

currentYear.textContent = new Date().getFullYear();
