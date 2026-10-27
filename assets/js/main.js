(() => {
  const root = document.documentElement;
  root.classList.add("js");

  // Header: fundo claro depois do topo da página
  const header = document.querySelector("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const setMenu = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Entrada suave dos elementos
  // ?static mostra tudo já revelado (capturas de tela de página inteira)
  const items = document.querySelectorAll(".reveal");
  const isStatic = new URLSearchParams(location.search).has("static");
  if (isStatic) document.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = "eager"; });
  if (!isStatic && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add("is-in"));
  }

  // WhatsApp flutuante só entre o hero e o CTA final (lá já existe o botão principal)
  const wa = document.querySelector("[data-wa-float]");
  const zones = document.querySelectorAll(".hero, .cta-final, .site-footer");
  if (wa && zones.length && "IntersectionObserver" in window) {
    const inView = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? inView.add(entry.target) : inView.delete(entry.target)));
      wa.classList.toggle("is-visible", inView.size === 0);
    });
    zones.forEach((el) => io.observe(el));
  }
})();
