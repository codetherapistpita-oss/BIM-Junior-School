document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".page-transition");
  if (overlay) overlay.classList.remove("active");

  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initScrollReveal();
  initCounters();
  initTestimonialSlider();
  initContactForm();
  initTiltCards();
  initParallax();
  initParticles();
  initButtonRipple();
  initPageTransitions();
  initGalleryZoom();
});

/* Preloader — timed welcome screen (max 2.5s) */
function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  const TOTAL_MS = 2500;
  const EXIT_START_MS = 2000;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;

    document.body.classList.remove("preloader-active");
    document.body.classList.add("loaded");
    preloader.classList.add("hidden");
  };

  setTimeout(() => preloader.classList.add("exiting"), EXIT_START_MS);
  setTimeout(finish, TOTAL_MS);
}

/* Navbar scroll effect */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Scroll progress bar */
function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    },
    { passive: true }
  );
}

/* Mobile menu */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
    document.body.style.overflow = navLinks.classList.contains("open")
      ? "hidden"
      : "";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* Scroll reveal animations */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-rotate, .stagger-children, .timeline-item, .section-header"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* Animated counters */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* Testimonial slider */
function initTestimonialSlider() {
  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".slider-dots .dot");
  if (!cards.length) return;

  let current = 0;
  let interval;

  const showSlide = (index) => {
    cards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    cards[index].classList.add("active");
    if (dots[index]) dots[index].classList.add("active");
    current = index;
  };

  const nextSlide = () => {
    showSlide((current + 1) % cards.length);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      resetInterval();
    });
  });

  const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  };

  showSlide(0);
  resetInterval();
}

/* Contact form */
function initContactForm() {
  const form = document.querySelector(".contact-form form");
  if (!form) return;

  const successMsg = document.querySelector(".form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    setTimeout(() => {
      form.style.display = "none";
      if (successMsg) successMsg.classList.add("show");
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1500);
  });
}

/* 3D tilt on cards */
function initTiltCards() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cards = document.querySelectorAll(
    ".feature-card, .program-card, .team-card, .hero-card"
  );

  cards.forEach((card) => {
    card.classList.add("tilt-card");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* Parallax on hero shapes */
function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const shapes = document.querySelectorAll(".shape");
  const hero = document.querySelector(".hero, .page-hero");
  if (!shapes.length || !hero) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      shapes.forEach((shape, i) => {
        const speed = 0.08 + i * 0.04;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    },
    { passive: true }
  );
}

/* Floating particles in hero */
function initParticles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.querySelector(".hero, .page-hero");
  if (!hero) return;

  const container = document.createElement("div");
  container.className = "hero-particles";
  hero.appendChild(container);

  const colors = ["var(--purple)", "var(--blue-bright)", "var(--gold)", "var(--purple-light)"];

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    const size = 4 + Math.random() * 8;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[i % colors.length]};
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(particle);
  }
}

/* Button ripple effect */
function initButtonRipple() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* Gallery subtle zoom on scroll */
function initGalleryZoom() {
  const items = document.querySelectorAll(".gallery-item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("gallery-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}

function initPageTransitions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const overlay = document.querySelector(".page-transition");
  if (!overlay) return;

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      link.target === "_blank"
    ) {
      return;
    }

    const isInternal =
      href.endsWith(".html") ||
      href === "index.html" ||
      href === "about.html" ||
      (!href.includes("://") && !href.startsWith("//"));

    if (!isInternal) return;

    link.addEventListener("click", (e) => {
      const url = link.href;
      if (url === window.location.href) return;

      e.preventDefault();
      overlay.classList.add("active");
      setTimeout(() => {
        window.location.href = url;
      }, 450);
    });
  });
}
