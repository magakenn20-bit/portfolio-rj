document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".page-loader");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");
  const tabButtons = [...document.querySelectorAll(".tab-button")];
  const actionButtons = document.querySelectorAll("[data-tab]");
  const panels = [...document.querySelectorAll(".page-panel")];
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

  function closeMobileMenu() {
    if (navigation) {
      navigation.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }

    document.body.classList.remove("menu-open");
  }

  function openTab(tabId, updateUrl = true) {
    const selectedPanel = document.getElementById(tabId);
    const fallbackPanel = document.getElementById("home");
    const activePanel = selectedPanel || fallbackPanel;

    if (!activePanel) {
      return;
    }

    panels.forEach((panel) => {
      const isActive = panel === activePanel;

      panel.hidden = !isActive;
      panel.setAttribute("aria-hidden", String(!isActive));
      panel.classList.toggle("active-panel", isActive);
    });

    tabButtons.forEach((button) => {
      const isActive = button.dataset.tab === activePanel.id;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });

    if (updateUrl) {
      window.history.pushState(null, "", `#${activePanel.id}`);
    }

    window.scrollTo(0, 0);
    closeMobileMenu();
  }

  actionButtons.forEach((element) => {
    element.addEventListener("click", () => {
      openTab(element.dataset.tab);
    });
  });

  tabButtons.forEach((button, index) => {
    button.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabButtons.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = tabButtons.length - 1;
      }

      if (nextIndex !== index) {
        event.preventDefault();

        const nextButton = tabButtons[nextIndex];
        nextButton.focus();
        openTab(nextButton.dataset.tab);
      }
    });
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

  const initialTab = window.location.hash
    ? window.location.hash.substring(1)
    : "home";

  openTab(initialTab, false);

  window.addEventListener("popstate", () => {
    const tabId = window.location.hash
      ? window.location.hash.substring(1)
      : "home";

    openTab(tabId, false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }
});