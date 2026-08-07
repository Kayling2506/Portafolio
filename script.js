/**
 * Portafolio Técnico - Script Principal Refactorizado
 * Manejo de navegación interactiva, ScrollSpy, copiado rápido y accesibilidad responsive.
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('header[id], section[id], footer[id]');

    // Función auxiliar para actualizar enlace activo (ignora #home para mantener la portada limpia)
    const setActiveNav = (targetId) => {
        navAnchors.forEach((anchor) => {
            const href = anchor.getAttribute('href')?.replace('#', '');
            if (targetId && targetId !== 'home' && href === targetId) {
                anchor.classList.add('active-link');
            } else {
                anchor.classList.remove('active-link');
            }
        });
    };

    // 1. Manejo del menú móvil (Navegación)
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });

        // Cerrar el menú y actualizar enlace al hacer clic
        navAnchors.forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');

                const targetId = link.getAttribute('href')?.replace('#', '');
                setActiveNav(targetId);
            });
        });
    }

    // 2. ScrollSpy adaptativo (apaga resoplos al subir al Home)
    if (sections.length > 0 && navAnchors.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -40% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    if (currentId === 'home') {
                        setActiveNav(null);
                    } else {
                        setActiveNav(currentId);
                    }
                }
            });
        }, observerOptions);

        sections.forEach((section) => observer.observe(section));

        // Garantizar apagar luces cerca de la portada
        window.addEventListener('scroll', () => {
            if (window.scrollY < 200) {
                setActiveNav(null);
            }
        }, { passive: true });
    }

    // 3. Copiar correo al portapapeles con Toast estilo retro
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = emailLink.getAttribute('href').replace('mailto:', '');
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    showToast(`[ CLIPBOARD: ${email} COPIADO ]`);
                }).catch(() => {
                    window.location.href = emailLink.getAttribute('href');
                });
            }
        });
    }

    // Toast flotante retro
    function showToast(message) {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 4. Prevenir arrastre accidental de imágenes
    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('draggable', 'false');
    });
});
