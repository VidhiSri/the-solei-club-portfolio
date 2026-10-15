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
  { name: "Warsaw", caption: "City strolls", image: 54 },
  { name: "Rome", caption: "Iconic landmarks", image: 55 },
  { name: "Zakynthos", caption: "Island mood", image: 56 },
  { name: "Lisbon", caption: "Rooftops & tiles", image: 57 },
];

const testimonials = [
  { quote: "Working with Klaudia was effortless and inspiring. She understood the feeling we wanted to evoke and translated it into visuals that were both artistic and emotionally rich. The photos and videos made our listing stand out in a sea of sameness.", by: "Hacienda Wabi", place: "Tulum, Mexico" },
  { quote: "Klaudia didn’t just photograph our villa — she captured its essence. Her eye for detail and the relaxed, sun-soaked mood she created made our space feel truly alive. The content she delivered helped us connect with exactly the kind of guests we dreamed of welcoming.", by: "Sun’n Salt Villa", place: "Corfu, Greece" },
  { quote: "Working with Klaudia was super easy, her creative vision in terms of lifestyle photos was perfectly aligning with our brand. She took the time to thoughtfully showcase every part of the guest journey from slow breakfasts to the inviting atmosphere of our bar, the cozy details in each room and quiet staycation moments.", by: "Hotel Pullmann", place: "Budapest, Hungary" },
];

function projectCard(project, index) {
  return `<article class="project-card">
    <button class="project-open" type="button" data-project="${index}" aria-label="View ${project.name} photo gallery">
      <img src="${photo(project.images[0])}" alt="${project.name} in ${project.location}" loading="lazy" />
    </button>
    <div class="project-caption"><div><h3>${project.name}</h3><p>${project.location} · ${project.category}</p></div></div>
  </article>`;
}

document.querySelector("#featured-projects").innerHTML = projects.slice(0, 3).map(projectCard).join("");
document.querySelector("#all-projects").innerHTML = projects.map(projectCard).join("");
document.querySelector("#travel-guides").innerHTML = destinations.map((destination) => `<article class="travel-card">
  <img src="${photo(destination.image)}" alt="${destination.name} — ${destination.caption}, destination guide cover" loading="lazy" />
  <h3>${destination.name}</h3><p>${destination.caption}</p>
</article>`).join("");
document.querySelector("#year").textContent = new Date().getFullYear();

let quoteIndex = 0;
function showQuote() {
  const quote = testimonials[quoteIndex];
  document.querySelector("#testimonial-quote").textContent = `“${quote.quote}”`;
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
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Website enquiry from ${form.get("name")}`;
  const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\nQuestion:\n${form.get("question")}`;
  const mailto = `mailto:thesoleiclub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector("#contact-form-note").textContent = "Your email app is opening with your message ready to send.";
  window.location.href = mailto;
});
