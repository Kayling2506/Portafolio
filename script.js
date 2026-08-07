/**
 * Portafolio Técnico - Script Principal
 * Manejo de navegación interactiva y mejoras accesibles de experiencia de usuario.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Manejo del menú móvil (Navegación)
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Cerrar el menú al hacer clic en cualquier enlace
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Prevenir arrastre accidental de imágenes (UX limpia sin bloqueos invasivos)
    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('draggable', 'false');
    });
});
