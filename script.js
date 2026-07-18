// ================================
// 0. PAGE LOADER
// ================================
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => {
    loader.classList.add('fade-out');
  }, 1000); // 1 second loader
});

// ================================
// 1. CATEGORY FILTER LOGIC
// ================================
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active button switch
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.filter; // "all", "gaming", etc.

    cards.forEach(card => {
      const cardCategory = card.dataset.category;

      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hide');
        card.classList.add('show');
      } else {
        card.classList.add('hide');
        card.classList.remove('show');
      }
    });
  });
});


// ================================
// 2. VIDEO MODAL (LIGHTBOX) LOGIC
// ================================
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModalBtn = document.getElementById('closeModal');

// Har card pe apna video ID daalna — data-video attribute use karenge
cards.forEach(card => {
  card.addEventListener('click', () => {
    const videoId = card.dataset.video; // e.g. "dQw4w9WgXcQ"
    if (videoId) {
      modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      modal.classList.add('active');
    }
  });
});

// Close button click
closeModalBtn.addEventListener('click', closeModal);

// Modal ke bahar (background) click karne pe bhi close ho
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Escape key pe bhi close ho
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove('active');
  modalVideo.src = ''; // video stop karne ke liye src empty
}


// ================================
// 3. SCROLL FADE-UP ANIMATION
// ================================
const fadeSections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15
});

fadeSections.forEach(section => observer.observe(section));


// ================================
// 4. SMOOTH SCROLL FOR NAV LINKS
// ================================
const navLinks = document.querySelectorAll('.nav-links a, .cta-btn');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});