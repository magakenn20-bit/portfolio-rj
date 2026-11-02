document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(".navigation a");
  const sections = document.querySelectorAll(".page-section");
  const currentYear = document.querySelector("#current-year");
  const cursorGlow = document.querySelector(".cursor-glow");

function hideLoader() {
    if (loader) {
      loader.classList.add("hidden");
    }
  }

setTimeout(hideLoader, 500);
  window.addEventListener("load", hideLoader);

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

function showPage(pageId, updateUrl = true) {
    const requestedPage = document.getElementById(pageId);
    const activePage = requestedPage || document.getElementById("home");

if (!activePage) {
      return;
    }

sections.forEach((section) => {
      section.classList.remove("active-page");
      section.setAttribute("aria-hidden", "true");
    });

activePage.classList.add("active-page");
    activePage.setAttribute("aria-hidden", "false");

navLinks.forEach((link) => {
      const linkId = link.getAttribute("href").replace("#", "");
      const isActive = linkId === activePage.id;

link.classList.toggle("active", isActive);

if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

if (navigation) {
      navigation.classList.remove("open");
    }

if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }

document.body.classList.remove("menu-open");

if (updateUrl) {
      history.pushState(null, "", `#${activePage.id}`);
    }
  }

document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

if (!link) {
      return;
    }

const pageId = link.getAttribute("href").replace("#", "");

if (!document.getElementById(pageId)) {
      return;
    }

event.preventDefault();
    showPage(pageId);
  });

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

document.body.classList.toggle("menu-open", isOpen);
    });
  }

const firstPage = window.location.hash
    ? window.location.hash.replace("#", "")
    : "home";

showPage(firstPage, false);

window.addEventListener("popstate", () => {
    const pageId = window.location.hash
      ? window.location.hash.replace("#", "")
      : "home";

showPage(pageId, false);
  });

if (
    cursorGlow &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    window.addEventListener("mousemove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }
});
