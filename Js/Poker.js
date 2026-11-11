 // DICCIONARIO DE DATOS TÉCNICOS POR CATEGORÍA
    const projectData = {
      cctv: {
        title: "1. CCTV & Videovigilancia",
        cards: [
          { tag: "CCTV & IP", title: "Despliegue NVR & Cámaras IP", text: "Instalación, cableado estructurado y configuración de sistema de videovigilancia híbrido Hikvision.", img: "img/Portadas/cctv.webp" },
          { tag: "ANALÓGICO/IP", title: "Configuración XVR Híbrido", text: "Integración de cámaras analógicas HD con módulos IP y optimización de disco duro de grabación.", img: "img/Portadas/Pruebas.jpg" },
          { tag: "REMOTA", title: "Visualización Remota Segura", text: "Configuración de acceso P2P y reglas de router para monitoreo desde apps móviles.", img: "img/Portadas/Pruebas.jpg" }
        ]
      },
      redes: {
        title: "2. Redes & Cableado Estructurado",
        cards: [
          { tag: "REDES", title: "Peinado y Organización de Racks", text: "Reestructuración de cableado, etiquetado de puertos patch panel y ordenamiento de switches.", img: "img/Portadas/Pruebas.jpg" },
          { tag: "DIAGNÓSTICO", title: "Certificación de Puntos de Red", text: "Pruebas de continuidad y mapeo de UTP Cat6 para eliminación de latencia en oficinas.", img: "img/Portadas/Pruebas.jpg" },
          { tag: "WIFI", title: "Despliegue de Access Points", text: "Instalación y configuración de APs con cobertura unificada para redes escolares.", img: "img/Portadas/Pruebas.jpg" }
        ]
      },
      soporte: {
        title: "3. Soporte Técnico & Hardware",
        cards: [
          { tag: "HARDWARE", title: "Mantenimiento Preventivo / Correctivo", text: "Reemplazo térmico, limpieza profunda de disipación y optimización general de componentes.", img: "img/Portadas/Pruebas.jpg" },
          { tag: "REPARACIÓN", title: "Reconstrucción de Bisagras", text: "Reparación estructural de chasis y bisagras en laps de uso rudo sin afectar la pantalla.", img: "img/Portadas/Pruebas.jpg" },
          { tag: "UPGRADE", title: "Actualización masiva a SSD", text: "Migración de discos mecánicos a estado sólido clonando sistemas operativos sin pérdida de datos.", img: "img/Portadas/Pruebas.jpg" }
        ]
      },
      admin: {
        title: "4. Informática Administrativa",
        cards: [
          { tag: "GESTIÓN TI", title: "Optimización de Bases de Datos", text: "Mantenimiento a MariaDB/MySQL, limpieza de registros redundantes y consultas aceleradas.", img: "assets/img/proyecto-admin-1.jpg" },
          { tag: "PROCESOS", title: "Automatización de Reportes", text: "Creación de flujos de trabajo centralizados para eliminar tareas repetitivas en oficina.", img: "assets/img/proyecto-admin-2.jpg" },
          { tag: "INVENTARIOS", title: "Control de Activos Informáticos", text: "Implementación de inventario digitalizado para seguimiento de garantías y ciclos de vida.", img: "assets/img/proyecto-admin-3.jpg" }
        ]
      },
      edtech: {
        title: "5. EdTech & LMS Moodle",
        cards: [
          { tag: "EDTECH", title: "Administración Moodle LMS", text: "Mantenimiento de plataforma, gestión de inscripciones masivas y soporte ante entrega de exámenes.", img: "assets/img/proyecto-moodle-1.jpg" },
          { tag: "PLUGINS", title: "Integración de Módulos Escolares", text: "Configuración de plugins de evaluación, herramientas interactivas y pasarelas de correo SMTP.", img: "assets/img/proyecto-moodle-2.jpg" },
          { tag: "WP", title: "Administración Portales WordPress", text: "Mantenimiento de sitios institucionales con integración Polylang y optimización de carga.", img: "assets/img/proyecto-moodle-3.jpg" }
        ]
      },
      seguridad: {
        title: "6. Seguridad & Respaldo de Datos",
        cards: [
          { tag: "SEGURIDAD", title: "Recuperación de Información", text: "Diagnóstico y rescate de archivos críticos en unidades lógicamente dañadas.", img: "assets/img/proyecto-forense-1.jpg" },
          { tag: "VPN", title: "Políticas de Teletrabajo Seguro", text: "Implementación de conexiones VPN encriptadas y protección de dispositivos finales.", img: "assets/img/proyecto-forense-2.jpg" },
          { tag: "BACKUP", title: "Estrategias de Respaldo Automatizado", text: "Configuración de respaldos periódicos locales y en nube con políticas 3-2-1.", img: "assets/img/proyecto-forense-3.jpg" }
        ]
      }
    };

    const deckModal = document.getElementById('deckModal');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const modalDeckContainer = document.getElementById('modalDeckContainer');
    const modalCategoryTitle = document.getElementById('modalCategoryTitle');
    const btnNextCard = document.getElementById('btnNextCard');

    function openDeckModal(categoryKey) {
      const data = projectData[categoryKey];
      if (!data) return;

      modalCategoryTitle.textContent = data.title;
      modalDeckContainer.innerHTML = '';

      data.cards.forEach(cardData => {
        const cardElem = document.createElement('article');
        cardElem.className = 'card-3d';
        cardElem.innerHTML = `
          <div class="card-inner">
            <div class="card-media">
              <img src="${cardData.img}" alt="${cardData.title}" class="card-img">
              <span class="card-badge">${cardData.tag}</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">${cardData.title}</h3>
              <p class="card-text">${cardData.text}</p>
            </div>
          </div>
        `;
        modalDeckContainer.appendChild(cardElem);
      });

      deckModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      deckModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    btnCloseModal.addEventListener('click', closeModal);
    deckModal.addEventListener('click', (e) => {
      if (e.target === deckModal) closeModal();
    });

    btnNextCard.addEventListener('click', () => {
      const cards = modalDeckContainer.querySelectorAll('.card-3d:not(.dismissing)');
      if (cards.length === 0) return;

      const topCard = cards[0];
      topCard.classList.add('dismissing');

      setTimeout(() => {
        topCard.classList.remove('dismissing');
        modalDeckContainer.appendChild(topCard);
      }, 400);
    });