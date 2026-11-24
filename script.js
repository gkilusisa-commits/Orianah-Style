const phoneNumber = "243900582552";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-chip");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "tout" && !categories.includes(filter);
    });
  });
});

const swatches = document.querySelectorAll(".swatch");
const colorInput = document.querySelector("#project-color");
const swatchNote = document.querySelector("#swatch-note");

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    swatches.forEach((item) => item.setAttribute("aria-pressed", String(item === swatch)));
    colorInput.value = swatch.dataset.color;
    swatchNote.textContent = swatch.dataset.color;
  });
});

const ideaForm = document.querySelector("#idea-form");

ideaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(ideaForm);
  const project = formData.get("project");
  const details = formData.get("details").trim();
  const color = formData.get("color");
  const message = [
    "Bonjour Orianah Style !",
    "",
    `J’aimerais imaginer : ${project}.`,
    details ? `Mon idée : ${details}` : "",
    color ? `Couleurs / motif : ${color}.` : "",
    "",
    "Pouvez-vous m’aider à donner vie à ce projet ?",
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("js-motion");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
