document.addEventListener("DOMContentLoaded", () => {
  /* --- Mobile menu toggle --- */
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navLinksAnchors = document.querySelectorAll(".nav-links a");

  // Toggle nav open/close
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    // Accessibility: aria-expanded on menu icon (if desired)
    const expanded = navLinks.classList.contains("open");
    menuIcon.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  // Close the mobile menu when a nav link is clicked
  navLinksAnchors.forEach((a) => {
    a.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuIcon.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Ensure nav is visible when resizing to desktop width (removes possible stuck state)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850 && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuIcon.setAttribute("aria-expanded", "false");
    }
  });

  /* --- Active link on scroll (keeps your original logic) --- */
  const sections = document.querySelectorAll("section");
  const navLinkEls = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinkEls.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* --- FILTER PROJECTS (keeps original behavior) --- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      let category = btn.dataset.category;

      projectCards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* --- MODAL (keeps original behavior) --- */
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.querySelectorAll(".closeModal, .modal .closeModal");
  let currentIndex = 0;
  let currentImages = [];

  document.querySelectorAll(".project-img").forEach((img) => {
    img.addEventListener("click", function () {
      const gallery = this.parentElement.querySelector(".gallery-images");
      if (!gallery) return;

      currentImages = [...gallery.querySelectorAll("img")].map(i => i.src);
      if (!currentImages.length) return;
      currentIndex = 0;
      modalImg.src = currentImages[currentIndex];
      modal.style.display = "flex";
    });
  });

  const nextBtn = document.getElementById("nextImg");
  const prevBtn = document.getElementById("prevImg");

  if (nextBtn) nextBtn.onclick = () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  };

  if (prevBtn) prevBtn.onclick = () => {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  };

  const closeModalSingle = document.querySelector(".closeModal");
  if (closeModalSingle) closeModalSingle.onclick = () => modal.style.display = "none";

  window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };

});
