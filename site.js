const photo = (number) => `assets/klaudia-${number}.jpg`;

const projects = [
  { name: "Hacienda by Wabi", location: "Tulum, Mexico", category: "Private villa", images: [2, 3, 4, 5, 6] },
  { name: "Sun’n Salt Villa", location: "Corfu, Greece", category: "Private villa", images: [41, 38, 39, 35, 36, 37, 42] },
  { name: "Palácio Ludovice", location: "Lisbon, Portugal", category: "Wine Experience Hotel", images: [18, 17, 19, 14, 15, 16] },
  { name: "Hotel Indigo Krakow", location: "Krakow, Poland", category: "Wawel Castle", images: [9, 8, 10, 11, 12] },
  { name: "Hotel Indigo Venice", location: "Venice, Italy", category: "Sant’Elena by IHG", images: [20, 21, 22] },
  { name: "Fraser Suites", location: "Hamburg, Germany", category: "Hotel", images: [24, 23, 25, 26, 27] },
  { name: "Hotel Pullmann", location: "Budapest, Hungary", category: "Hotel", images: [31, 30, 32, 33, 34] },
  { name: "Clipper Boardinghouse", location: "Hamburg, Germany", category: "Hotel", images: [44, 46, 47, 48, 49] },
];

const destinations = [
  { name: "Warsaw", caption: "City strolls", detail: "A little local guide to slow mornings, tucked-away cafés, and the streets worth wandering.", image: 54 },
  { name: "Rome", caption: "Iconic landmarks", detail: "Beautiful corners, memorable meals, and a few favorite ways to experience the Eternal City.", image: 55 },
  { name: "Zakynthos", caption: "Island days", detail: "Clear-water coves, sunlit stops, and the island moments you’ll want to linger over.", image: 56 },
  { name: "Lisbon", caption: "Rooftops & tiles", detail: "A collection of hillside views, tiled streets, and places to pause for one more pastel de nata.", image: 57 },
];

const testimonials = [
  { quote: "Working with Klaudia was effortless and inspiring. She understood the feeling we wanted to evoke and translated it into visuals that were both artistic and emotionally rich. The photos and videos made our listing stand out in a sea of sameness.", by: "Hacienda Wabi", place: "Tulum, Mexico" },
  { quote: "Klaudia didn’t just photograph our villa — she captured its essence. Her eye for detail and the relaxed, sun-soaked mood she created made our space feel truly alive. The content she delivered helped us connect with exactly the kind of guests we dreamed of welcoming.", by: "Sun’n Salt Villa", place: "Corfu, Greece" },
  { quote: "Working with Klaudia was super easy, her creative vision in terms of lifestyle photos was perfectly aligning with our brand. She took the time to thoughtfully showcase every part of the guest journey from slow breakfasts to the inviting atmosphere of our bar, the cozy details in each room and quiet staycation moments.", by: "Hotel Pullmann", place: "Budapest, Hungary" },
];

function projectCard(project, index) {
  return `<article class="project-card" data-reveal>
    <button class="project-open" type="button" data-project="${index}" aria-label="View ${project.name} photo gallery">
      <img src="${photo(project.images[0])}" alt="${project.name} in ${project.location}" loading="lazy" />
    </button>
    <div class="project-caption"><div><h3>${project.name}</h3><p>${project.location} · ${project.category}</p></div></div>
  </article>`;
}

document.querySelector("#featured-projects").innerHTML = projects.slice(0, 3).map(projectCard).join("");
document.querySelector("#all-projects").innerHTML = projects.map(projectCard).join("");
const guideSlides = document.querySelector("#travel-guides");
const guidePagination = document.querySelector("#guide-pagination");
let guideIndex = 0;
function renderGuides() {
  const visibleGuides = [-1, 0, 1].map((offset) => (guideIndex + offset + destinations.length) % destinations.length);
  guideSlides.innerHTML = visibleGuides.map((index, position) => {
    const destination = destinations[index];
    const active = position === 1;
    return `<article class="travel-card${active ? " is-active" : " is-neighbor"}" aria-roledescription="slide" aria-label="${index + 1} of ${destinations.length}">
      <button class="guide-card-select" type="button" data-guide-index="${index}" aria-label="Show ${destination.name} pocket guide" aria-pressed="${active}">
        <div class="guide-image-wrap"><img src="${photo(destination.image)}" alt="${destination.name} — ${destination.caption}" ${active ? "fetchpriority=high" : "loading=lazy"} /></div>
        <div class="guide-copy"><p class="eyebrow">Pocket Guide ${String(index + 1).padStart(2, "0")}</p><h3>${destination.name}</h3><p class="guide-caption">${destination.caption}</p><p class="guide-detail">${destination.detail}</p></div>
      </button>
      ${active ? '<a class="text-link guide-link" href="https://www.instagram.com/klaudiasgram/" target="_blank" rel="noreferrer">Explore on Instagram <span aria-hidden="true">↗</span></a>' : ""}
    </article>`;
  }).join("");
  guidePagination.innerHTML = destinations.map((destination, index) => `<button class="guide-dot${index === guideIndex ? " is-active" : ""}" type="button" aria-label="Show ${destination.name} pocket guide" aria-current="${index === guideIndex ? "true" : "false"}" data-guide-index="${index}"></button>`).join("");
  document.querySelector("#guide-count").textContent = `${String(guideIndex + 1).padStart(2, "0")} / ${String(destinations.length).padStart(2, "0")} · ${destinations.length} guides`;
}
function changeGuide(step) {
  guideIndex = (guideIndex + step + destinations.length) % destinations.length;
  renderGuides();
}
renderGuides();
document.querySelector("#guide-previous").addEventListener("click", () => changeGuide(-1));
document.querySelector("#guide-next").addEventListener("click", () => changeGuide(1));
const guideCarousel = document.querySelector(".guide-carousel");
let guidePointerStart = null;
let suppressGuideClick = false;
let lastGuideWheel = 0;
guideCarousel.addEventListener("pointerdown", (event) => {
  guidePointerStart = { x: event.clientX, y: event.clientY };
});
guideCarousel.addEventListener("pointerup", (event) => {
  if (!guidePointerStart) return;
  const dx = event.clientX - guidePointerStart.x;
  const dy = event.clientY - guidePointerStart.y;
  guidePointerStart = null;
  if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
  suppressGuideClick = true;
  changeGuide(dx < 0 ? 1 : -1);
  window.setTimeout(() => { suppressGuideClick = false; }, 350);
});
guideCarousel.addEventListener("pointercancel", () => { guidePointerStart = null; });
guideCarousel.addEventListener("wheel", (event) => {
  if (Math.abs(event.deltaX) < 24 || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.15) return;
  event.preventDefault();
  const now = Date.now();
  if (now - lastGuideWheel < 500) return;
  lastGuideWheel = now;
  changeGuide(event.deltaX > 0 ? 1 : -1);
}, { passive: false });
guideCarousel.addEventListener("keydown", (event) => {
  if (event.target.closest("input, textarea, select")) return;
  if (event.key === "ArrowLeft") { event.preventDefault(); changeGuide(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); changeGuide(1); }
});
guideSlides.addEventListener("click", (event) => {
  if (suppressGuideClick) { event.preventDefault(); return; }
  const button = event.target.closest("[data-guide-index]");
  if (!button) return;
  guideIndex = Number(button.dataset.guideIndex);
  renderGuides();
});
guidePagination.addEventListener("click", (event) => {
  const button = event.target.closest("[data-guide-index]");
  if (!button) return;
  guideIndex = Number(button.dataset.guideIndex);
  renderGuides();
});
document.querySelector("#year").textContent = new Date().getFullYear();

let quoteIndex = 0;
function showQuote() {
  const quote = testimonials[quoteIndex];
  const quoteElement = document.querySelector("#testimonial-quote");
  quoteElement.textContent = `“${quote.quote}”`;
  quoteElement.classList.remove("quote-enter");
  void quoteElement.offsetWidth;
  quoteElement.classList.add("quote-enter");
  document.querySelector("#testimonial-by").textContent = quote.by;
  document.querySelector("#testimonial-place").textContent = quote.place;
  document.querySelector("#quote-count").textContent = `0${quoteIndex + 1} / 0${testimonials.length}`;
}
showQuote();
document.querySelector("#previous-quote").addEventListener("click", () => {
  quoteIndex = (quoteIndex + testimonials.length - 1) % testimonials.length;
  showQuote();
});
document.querySelector("#next-quote").addEventListener("click", () => {
  quoteIndex = (quoteIndex + 1) % testimonials.length;
  showQuote();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  mainNav.classList.remove("is-open");
}
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

const gallery = document.querySelector("#gallery");
let currentProject = null;
let imageIndex = 0;
function updateGallery() {
  const image = currentProject.images[imageIndex];
  document.querySelector("#gallery-title").textContent = currentProject.name;
  document.querySelector("#gallery-location").textContent = currentProject.location;
  const galleryImage = document.querySelector("#gallery-image");
  galleryImage.src = photo(image);
  galleryImage.alt = `${currentProject.name}, photograph ${imageIndex + 1} of ${currentProject.images.length}`;
  document.querySelector("#gallery-count").textContent = `${imageIndex + 1} / ${currentProject.images.length}`;
}
function changeGallery(step) {
  if (!currentProject) return;
  imageIndex = (imageIndex + step + currentProject.images.length) % currentProject.images.length;
  updateGallery();
}
document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-project]");
  if (!trigger) return;
  currentProject = projects[Number(trigger.dataset.project)];
  imageIndex = 0;
  updateGallery();
  gallery.showModal();
});
document.querySelector("#gallery-close").addEventListener("click", () => gallery.close());
document.querySelector("#gallery-previous").addEventListener("click", () => changeGallery(-1));
document.querySelector("#gallery-next").addEventListener("click", () => changeGallery(1));
gallery.addEventListener("click", (event) => {
  if (event.target === gallery) gallery.close();
});
gallery.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") changeGallery(-1);
  if (event.key === "ArrowRight") changeGallery(1);
});

const contactDialog = document.querySelector("#contact-dialog");
document.querySelectorAll("[data-contact-open]").forEach((button) => {
  button.addEventListener("click", () => contactDialog.showModal());
});
document.querySelector(".contact-close").addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", (event) => {
  if (event.target === contactDialog) contactDialog.close();
});
const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const note = document.querySelector("#contact-form-note");
  const fallback = document.querySelector("#contact-form-fallback");
  const submitButton = contactForm.querySelector("[type=submit]");
  const submitLabel = "Send a message";
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";
  note.textContent = "Sending your message securely…";
  fallback.hidden = true;
  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(contactForm).entries())),
    });
    const result = await response.json();
    if (!response.ok || !(result.success === true || result.success === "true")) {
      throw new Error(result.message || "The message could not be sent.");
    }
    contactForm.reset();
    note.textContent = "Thank you — your message has been sent. Klaudia will be in touch soon.";
  } catch (error) {
    note.textContent = "We couldn’t send your message just now. Please try again or use the email link below.";
    fallback.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = `${submitLabel} <span aria-hidden="true">↗</span>`;
  }
});

document.querySelectorAll(".section-intro, .about-photo-wrap, .about-copy, .services-photo-wrap, .service-item, .testimonial-inner, .contact-band, .instagram-grid a, .site-footer").forEach((element) => element.setAttribute("data-reveal", ""));
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-scroll-reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  function observeRevealElements() {
    document.querySelectorAll("[data-reveal]:not([data-reveal-observed])").forEach((element) => {
      element.dataset.revealObserved = "true";
      revealObserver.observe(element);
    });
  }
  observeRevealElements();
}
