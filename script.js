/**
 * Portafolio Técnico - Script Principal Refactorizado
 * Manejo de navegación interactiva, ScrollSpy, copiado rápido y accesibilidad responsive.
 */

// Variable para la gestión del temporizador de notificaciones (Toast)
let toastTimeout = null;

/**
 * Inicialización principal al cargar el DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    const navAnchors = document.querySelectorAll('.nav-links a');

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

    initMobileMenu(navAnchors, setActiveNav);
    initScrollSpy(navAnchors, setActiveNav);
    initClipboardMailto();
    initWaBanner();
    initImageProtection();
});

/**
 * 1. Manejo del menú móvil (Navegación responsive)
 */
function initMobileMenu(navAnchors, setActiveNav) {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!menuBtn || !navLinks) return;

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

/**
 * 2. ScrollSpy adaptativo mediante IntersectionObserver
 */
function initScrollSpy(navAnchors, setActiveNav) {
    const sections = document.querySelectorAll('header[id], section[id], footer[id]');
    if (sections.length === 0 || navAnchors.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                setActiveNav(currentId === 'home' ? null : currentId);
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

/**
 * 3. Copiar correo al portapapeles con Toast retro (soporta múltiples enlaces mailto)
 */
function initClipboardMailto() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    if (emailLinks.length === 0) return;

    emailLinks.forEach((emailLink) => {
        emailLink.addEventListener('click', (e) => {
            const mailtoHref = emailLink.getAttribute('href');
            const email = mailtoHref.replace('mailto:', '');
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(email).then(() => {
                    showToast(`[ CLIPBOARD: ${email} COPIADO ]`);
                }).catch(() => {
                    window.location.href = mailtoHref;
                });
            }
        });
    });
}

/**
 * Muestra notificación flotante retro con control de timeout reiniciable
 */
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

    // Reiniciar temporizador anterior si existe para evitar ocultamiento prematuro
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toast.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toastTimeout = null;
    }, 3000);
}

/**
 * 4. Modal/Banner Alerta: Aviso No Llamadas / Solo WhatsApp
 */
function initWaBanner() {
    const openWaBannerBtn = document.getElementById('openWaBannerBtn');
    const closeWaBannerBtn = document.getElementById('closeWaBannerBtn');
    const waBannerOverlay = document.getElementById('waBannerOverlay');
    const confirmWaRedirectBtn = document.getElementById('confirmWaRedirectBtn');

    if (!openWaBannerBtn || !waBannerOverlay) return;

    const openBanner = () => {
        waBannerOverlay.classList.add('active');
        waBannerOverlay.setAttribute('aria-hidden', 'false');
    };

    const closeBanner = () => {
        waBannerOverlay.classList.remove('active');
        waBannerOverlay.setAttribute('aria-hidden', 'true');
    };

    openWaBannerBtn.addEventListener('click', openBanner);

    if (closeWaBannerBtn) {
        closeWaBannerBtn.addEventListener('click', closeBanner);
    }

    if (confirmWaRedirectBtn) {
        confirmWaRedirectBtn.addEventListener('click', closeBanner);
    }

    waBannerOverlay.addEventListener('click', (e) => {
        if (e.target === waBannerOverlay) {
            closeBanner();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && waBannerOverlay.classList.contains('active')) {
            closeBanner();
        }
    });
}

/**
 * 5. Prevenir arrastre accidental de imágenes
 */
function initImageProtection() {
    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('draggable', 'false');
    });
}
