 // DICCIONARIO DE DATOS TÉCNICOS POR CATEGORÍA
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


    