(() => {
  const panels = Array.from(document.querySelectorAll('.panel'));
  const tabs   = Array.from(document.querySelectorAll('.tab-list [data-tab]'));
  const gotos  = document.querySelectorAll('[data-goto]');
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.getElementById('site-nav');
  const loader = document.getElementById('loader');
  const glow   = document.querySelector('.cursor-glow');
  const ids    = panels.map(p => p.id);

  /* Mobile menu */
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Tap outside the menu to close it
  document.addEventListener('click', e => {
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  // Esc closes the menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
  // Reset the menu when the screen is resized or rotated
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* Tabs */
  function openTab(id, updateHash = true) {
    if (!ids.includes(id)) id = 'home';

    panels.forEach(p => p.classList.toggle('active', p.id === id));
    tabs.forEach(t => {
      const active = t.dataset.tab === id;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });

    if (updateHash && location.hash.slice(1) !== id) {
      history.pushState(null, '', '#' + id);
    }
    closeMenu();
    window.scrollTo(0, 0);
  }

  tabs.forEach(t => t.addEventListener('click', () => openTab(t.dataset.tab)));
  gotos.forEach(g => g.addEventListener('click', e => {
    e.preventDefault();
    openTab(g.dataset.goto);
  }));

  /* Arrow keys switch tabs */
  document.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const activePanel = panels.find(p => p.classList.contains('active'));
    const current = ids.indexOf(activePanel ? activePanel.id : 'home');
    const next = e.key === 'ArrowRight'
      ? (current + 1) % ids.length
      : (current - 1 + ids.length) % ids.length;
    openTab(ids[next]);
  });

  /* URL hash (back/forward buttons and direct links) */
  window.addEventListener('hashchange', () => openTab(location.hash.slice(1), false));
  openTab(location.hash.slice(1) || 'home', false);

  /* Loader */
  const hideLoader = () => loader && loader.classList.add('hide');
  window.addEventListener('load', () => setTimeout(hideLoader, 300));
  setTimeout(hideLoader, 3000); // safety fallback

  /* Cursor glow (mouse devices only) */
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', e => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  /* Footer year */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();