const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleButton && navLinks) {
    toggleButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        toggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleButton.setAttribute('aria-expanded', 'false');
        });
    });
}

const licenseCarousel = document.querySelector('.license-carousel');

if (licenseCarousel) {
    const track = licenseCarousel.querySelector('.carousel-track');
    const slides = Array.from(licenseCarousel.querySelectorAll('.license-slide'));
    const prevButton = licenseCarousel.querySelector('.carousel-btn.prev');
    const nextButton = licenseCarousel.querySelector('.carousel-btn.next');
    const dots = Array.from(licenseCarousel.querySelectorAll('.dot'));
    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    prevButton?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextButton?.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);

    updateCarousel();
}
