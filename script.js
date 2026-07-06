// Maneja el menú móvil para abrir y cerrar la navegación
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

// Controla el carrusel de licencias con botones, puntos y cambio automático
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

// Protege las imágenes para evitar arrastre y menú contextual en la página
const protectImages = () => {
    document.querySelectorAll('img').forEach((img) => {
        img.draggable = false;
        img.setAttribute('draggable', 'false');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';

        img.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        img.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
    });

    document.addEventListener('contextmenu', (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && (target.tagName === 'IMG' || target.closest('img'))) {
            event.preventDefault();
        }
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        const blockedShortcut = event.key === 'F12' ||
            (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
            (event.ctrlKey && key === 's');

        if (blockedShortcut) {
            event.preventDefault();
        }
    });
};

protectImages();

// Muestra la ventana emergente de bienvenida al cargar la página
const welcomeModal = document.getElementById('welcome-modal');
const closeWelcomeModalButton = document.getElementById('close-welcome-modal');

if (welcomeModal && closeWelcomeModalButton) {
    welcomeModal.hidden = false;
    welcomeModal.setAttribute('aria-hidden', 'false');

    closeWelcomeModalButton.addEventListener('click', () => {
        welcomeModal.hidden = true;
        welcomeModal.setAttribute('aria-hidden', 'true');
    });
}

// Muestra el botón para volver arriba al comenzar a bajar la página
const scrollTopButton = document.querySelector('.scroll-top');

if (scrollTopButton) {
    const toggleScrollTopButton = () => {
        const shouldShow = window.scrollY > 200;
        scrollTopButton.style.opacity = shouldShow ? '1' : '0';
        scrollTopButton.style.pointerEvents = shouldShow ? 'auto' : 'none';
        scrollTopButton.style.transform = shouldShow ? 'translateY(0)' : 'translateY(12px)';
    };

    toggleScrollTopButton();
    window.addEventListener('scroll', toggleScrollTopButton, { passive: true });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

