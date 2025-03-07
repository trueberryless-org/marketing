document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const sections = Array.from(document.querySelectorAll(".section"));
  const numSections = sections.length;
  let isScrolling = false;
  let scrollDuration = 400; // Default scroll duration in milliseconds

  // Clone first and last sections for seamless infinite scrolling
  const firstClone = sections[0].cloneNode(true);
  const lastClone = sections[numSections - 1].cloneNode(true);

  container.appendChild(firstClone);
  container.insertBefore(lastClone, sections[0]);

  let currentSection = Math.floor(Math.random() * numSections);

  // Set initial scroll position
  container.scrollLeft = currentSection * window.innerWidth;

  // Normalize scroll event to horizontal scrolling
  window.addEventListener(
    "wheel",
    (event) => {
      if (isScrolling) return;
      isScrolling = true;

      const delta = event.deltaY > 0 ? 1 : -1;
      const newScrollPosition =
        container.scrollLeft + delta * window.innerWidth;

      container.scroll({
        left: newScrollPosition,
        behavior: "smooth",
        duration: scrollDuration,
      });

      setTimeout(() => {
        // Adjust scroll position to maintain the infinite scrolling illusion
        if (container.scrollLeft >= window.innerWidth * (numSections + 1)) {
          container.scrollLeft = window.innerWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = window.innerWidth * numSections;
        }
        isScrolling = false;
      }, scrollDuration);

      event.preventDefault();
    },
    { passive: false }
  );

  // Buttons for navigation
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  container.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const containerRect = container.getBoundingClientRect();
    const leftThreshold = containerRect.left + 300; // Adjust the threshold as needed
    const rightThreshold = containerRect.right - 300; // Adjust the threshold as needed

    if (x < leftThreshold) {
      prevButton.style.opacity = "1";
      prevButton.style.pointerEvents = "auto";
    } else {
      prevButton.style.opacity = "0";
      prevButton.style.pointerEvents = "none";
    }

    if (x > rightThreshold) {
      nextButton.style.opacity = "1";
      nextButton.style.pointerEvents = "auto";
    } else {
      nextButton.style.opacity = "0";
      nextButton.style.pointerEvents = "none";
    }
  });

  prevButton.addEventListener("click", () => {
    const currentScrollPosition = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    const targetScrollPosition = currentScrollPosition - sectionWidth;

    container.scrollTo({
      left: targetScrollPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      // Adjust scroll position to maintain the infinite scrolling illusion
      if (container.scrollLeft >= window.innerWidth * (numSections + 1)) {
        container.scrollLeft = window.innerWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = window.innerWidth * numSections;
      }
      isScrolling = false;
    }, scrollDuration);
  });

  nextButton.addEventListener("click", () => {
    const currentScrollPosition = container.scrollLeft;
    const sectionWidth = window.innerWidth;
    const targetScrollPosition = currentScrollPosition + sectionWidth;

    container.scrollTo({
      left: targetScrollPosition,
      behavior: "smooth",
    });

    setTimeout(() => {
      // Adjust scroll position to maintain the infinite scrolling illusion
      if (container.scrollLeft >= window.innerWidth * (numSections + 1)) {
        container.scrollLeft = window.innerWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = window.innerWidth * numSections;
      }
      isScrolling = false;
    }, scrollDuration);
  });
});
