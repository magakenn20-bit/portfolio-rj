document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");
  const navLinks = document.querySelectorAll(".navigation a");
  const revealElements = document.querySelectorAll(".reveal");
  const currentYear = document.querySelector("#current-year");
  const cursorGlow = document.querySelector(".cursor-glow");

/*
    Hide the loading screen.
    This runs even if other optional effects fail.
  */
  if (loader) {
    window.setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  }

/*
    Add the current year to the footer.
  */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

/*
    Mobile navigation.
  */
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

navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        document.body.classList.remove("menu-open");
      });
    });
  }

/*
    Reveal sections while scrolling.
  */
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

/*
    Highlight the navigation link for the visible section.
  */
  const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("active");

if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

/*
    Desktop cursor glow.
  */
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }
});

/*
  Backup: always hide the loader after the page finishes loading.
  This protects against the page remaining stuck if an optional script fails.
*/
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");

if (loader) {
    loader.classList.add("hidden");
  }
});
