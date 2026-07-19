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

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, false);

