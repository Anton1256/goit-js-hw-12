import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more-btn");
const endMessage = document.querySelector(".end-message");
let lightbox = null;

function createImageCard(image) {
    const shortAlt = image.tags.split(',').slice(0, 3).join(', ');
    return `
    <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-link">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${shortAlt}"
                loading="lazy"
            />
            <div class="info">
                <div class="info-item">
                    <p class="info-label">Likes</p>
                    <span class="info-value">${image.likes}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Views</p>
                    <span class="info-value">${image.views}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Comments</p>
                    <span class="info-value">${image.comments}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Downloads</p>
                    <span class="info-value">${image.downloads}</span>
                </div>
            </div>
        </a>
    </li>
    `;
}

export function createGallery(images) {
    if (!gallery) return;
  
    const markup = images.map(createImageCard).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
    } else {
        lightbox.refresh();
    }
}

export function clearGallery() {
    if (!gallery) return;
    
    gallery.innerHTML = '';
    if (lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
}

export function showLoader() {
    loader?.classList.remove("hidden");
}

export function hideLoader() {
    loader?.classList.add("hidden");
}

export function showLoadMoreButton() {
    loadMoreBtn?.classList.remove("hidden");
    endMessage?.classList.add("hidden");
}

export function hideLoadMoreButton() {
    loadMoreBtn?.classList.add("hidden");
}

export function showEndMessage() {
    endMessage?.classList.remove("hidden");
}

export function hideEndMessage() {
    endMessage?.classList.add("hidden");
}