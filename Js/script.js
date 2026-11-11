/**
 * =============================================================================
 * PORTAFOLIO OFICIAL - LUIS ENRIQUE RAMÍREZ (IT & ADM)
 * Script Principal de Lógica, Interactividad, Navegación y Seguridad
 * 
 * Copyright (c) 2026 Luis Enrique Ramírez. Todos los derechos reservados.
 * 
 * [ AVISO DE PROTECCIÓN DE CÓDIGO Y PROPIEDAD INTELECTUAL ]
 * Queda estrictamente prohibida la copia, reproducción, distribución o uso
 * no autorizado de estos módulos de script sin la autorización previa por
 * escrito del titular de la obra.
 * 
 * Este módulo controla la navegación interactiva, observador ScrollSpy,
 * interfaz de portapapeles, modal de WhatsApp y seguridad de activos.
 * =============================================================================
 */

// Estado global para controlar la navegación sin repintados innecesarios
let toastTimeout = null;
let currentActiveId = undefined;

/**
 * Inicialización principal al cargar el árbol DOM
 * Configura los observadores, enlaces de navegación, portapapeles y ventanas modales.
 */
document.addEventListener('DOMContentLoaded', () => {
    const navAnchors = document.querySelectorAll('.nav-links a');

    // Pre-cachear atributos de destino exclusivamente para enlaces internos (anclas #)
    navAnchors.forEach((anchor) => {
        const href = anchor.getAttribute('href') || '';
        anchor.dataset.targetId = href.startsWith('#') ? href.replace('#', '') : '';
    });

    /**
     * Actualiza la clase 'active-link' en la barra de navegación sin repintados innecesarios.
     * @param {string|null} targetId - ID de la sección activa actual o null si está en portada.
     */
    const setActiveNav = (targetId) => {
        const activeTarget = (!targetId || targetId === 'home') ? null : targetId;
        if (currentActiveId === activeTarget) return;
        currentActiveId = activeTarget;

        navAnchors.forEach((anchor) => {
            anchor.classList.toggle('active-link', Boolean(activeTarget && anchor.dataset.targetId === activeTarget));
        });
    };

    initMobileMenu(navAnchors, setActiveNav);
    initScrollSpy(navAnchors, setActiveNav);
    initClipboardMailto();
    initWaBanner();
    initImageProtection();
    initScrollToTop();
});

/**
 * Controla la apertura, cierre y accesibilidad (ARIA) del menú de navegación en dispositivos móviles.
 * @param {NodeListOf<HTMLAnchorElement>} navAnchors - Colección de enlaces del menú de navegación.
 * @param {Function} setActiveNav - Función para actualizar visualmente el enlace activo.
 */
function initMobileMenu(navAnchors, setActiveNav) {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú y actualizar estado visual al interactuar con cualquier enlace
    navAnchors.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');

            const targetId = link.dataset.targetId;
            if (targetId) {
                setActiveNav(targetId);
            }
        });
    });
}

/**
 * Configura la detección automática de sección activa mediante IntersectionObserver.
 * Sincroniza dinámicamente el estado visual del menú sin cálculos pesados en cada evento de scroll.
 * @param {NodeListOf<HTMLAnchorElement>} navAnchors - Colección de enlaces del menú.
 * @param {Function} setActiveNav - Callback para activar el enlace correspondiente a la sección.
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

    // Apaga el resaltado activo al situarse muy cerca del inicio de la página
    window.addEventListener('scroll', () => {
        if (window.scrollY < 200) {
            setActiveNav(null);
        }
    }, { passive: true });
}

/**
 * Intercepta los enlaces mailto para copiar la dirección al portapapeles con fallback de navegación.
 * Emite una notificación flotante (toast) retro confirmando la acción.
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
 * Genera y despliega una notificación flotante estilo consola retro.
 * Si ya existe una notificación visible, reinicia el temporizador para evitar solapamientos.
 * @param {string} message - Texto informativo que se mostrará en el toast.
 */
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }

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
 * Gestiona el modal retro de aviso de WhatsApp (solo mensajes de texto, sin llamadas).
 * Incluye cierre mediante botón, overlay y tecla Escape (accesibilidad por teclado).
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
 * Desactiva el arrastre nativo de imágenes para salvaguardar la estética retro y evitar glitches visuales.
 */
function initImageProtection() {
    document.querySelectorAll('img').forEach((img) => {
        img.setAttribute('draggable', 'false');
    });
}

/**
 * Controla la visibilidad y desplazamiento suave del botón flotante para volver arriba.
 * Emplea requestAnimationFrame para asegurar 60fps sin saturar el hilo principal.
 */
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    let isScrolling = false;

    const handleScroll = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

