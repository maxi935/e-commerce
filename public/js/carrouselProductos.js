const slidesContainer = document.getElementById("slides-container");
const slides = document.querySelectorAll(".slide");
console.log(slides);
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
let currentSlideIndex = 0;

nextButton.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    const slideWidth = slides[currentSlideIndex].clientWidth;
    slidesContainer.scrollLeft = currentSlideIndex * slideWidth;
});

prevButton.addEventListener("click", () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    const slideWidth = slides[currentSlideIndex].clientWidth;
    slidesContainer.scrollLeft = currentSlideIndex * slideWidth;
});