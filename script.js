const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

const categories = ['minimalist', 'architecture', 'nature', 'abstract'];

// --- 1. GENERATE THE IMAGES ---
function loadGallery() {
    for (let i = 0; i < 12; i++) {
        const category = categories[i % categories.length];
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.setAttribute('data-category', category); // Crucial for filtering
        
        const imageUrl = `https://picsum.photos/800/1000?random=${i + 20}`;
        
        item.innerHTML = `<img src="${imageUrl}" alt="${category}">`;
        gallery.appendChild(item);
    }
}

// --- 2. FILTER LOGIC ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Switch 'active' class on buttons
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// --- 3. LIGHTBOX LOGIC ---
gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        lightboxImg.src = e.target.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

//Close when clicking the dark background (outside the image)
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize the gallery
loadGallery();


