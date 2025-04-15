function initGalleryOverlay() {
    const overlay = document.getElementById('media-overlay');
    const mediaContainer = document.querySelector('.media-container');
    const mediaTitle = document.querySelector('.media-title');
    const mediaInfo = document.querySelector('.media-info');
    const closeBtn = document.getElementById('close-overlay');
  
    const cards = document.querySelectorAll('.gallery-card');
  
    if (cards.length === 0) {
      console.warn("no cards try again");
      return false;
    }
  
    console.log(`✅ Found ${cards.length} gallery cards`);
  
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const type = card.dataset.type;
        const src = card.dataset.src;
        const title = card.dataset.title;
        const info = card.dataset.info;
  
        mediaContainer.innerHTML = '';
  
        if (type === 'video') {
          const video = document.createElement('video');
          video.src = src;
          video.controls = true;
          video.autoplay = true;
          video.loop = true;
          video.muted = true;
          video.playsInline = true;
          mediaContainer.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = src;
          mediaContainer.appendChild(img);
        }
  
        mediaTitle.textContent = title;
        mediaInfo.textContent = info;
        overlay.classList.add('open');
      });
    });
  
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target === closeBtn) {
        overlay.classList.remove('open');
        mediaContainer.innerHTML = '';
      }
    });
  
    return true;
  }
  
  let galleryTryCount = 0;
  const galleryInterval = setInterval(() => {
    const success = initGalleryOverlay();
    galleryTryCount++;
  
    if (success || galleryTryCount > 10) {
      clearInterval(galleryInterval);
      if (!success) console.error("No cards");
    }
  }, 200);
  



  // gallery filter for burger menu
  function filterGalleryByCategory() {
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get('category')?.toLowerCase();
  
    const allCards = document.querySelectorAll('.gallery-card');
  
    if (!selectedCategory) {
      console.log("None in category");
      return;
    }
  
    allCards.forEach(card => {
      const cardCategory = card.dataset.category?.toLowerCase();
      const match = cardCategory === selectedCategory;
  
      card.style.display = match ? '' : 'none';
    });
  }
  

  document.addEventListener("DOMContentLoaded", () => {
    initGalleryOverlay();  
    filterGalleryByCategory(); 
  });
  

  